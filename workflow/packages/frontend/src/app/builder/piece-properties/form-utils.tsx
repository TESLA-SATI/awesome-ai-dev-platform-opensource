import { TSchema, Type } from '@sinclair/typebox';
import { t } from 'i18next';

import {
  BlockMetadata,
  BlockMetadataModel,
  BlockMetadataModelSummary,
  CONNECTION_REGEX,
  CustomAuthProperty,
  OAuth2Props,
  PieceAuthProperty,
  PiecePropertyMap,
  PropertyType,
} from 'workflow-blocks-framework';
import {
  Action,
  ActionType,
  CodeActionSchema,
  isEmpty,
  isNil,
  LoopOnItemsActionSchema,
  PieceActionSchema,
  PieceActionSettings,
  PieceTrigger,
  PieceTriggerSettings,
  RouterActionSchema,
  RouterBranchesSchema,
  RouterExecutionType,
  SampleDataSetting,
  spreadIfDefined,
  Trigger,
  TriggerType,
  UpsertAppConnectionRequestBody,
  UpsertBasicAuthRequest,
  UpsertCloudOAuth2Request,
  UpsertCustomAuthRequest,
  UpsertOAuth2Request,
  UpsertPlatformOAuth2Request,
  UpsertSecretTextRequest,
} from 'workflow-shared';

function addAuthToPieceProps(
  props: PiecePropertyMap,
  auth: PieceAuthProperty | undefined,
  requireAuth: boolean,
): PiecePropertyMap {
  if (!requireAuth || isNil(auth)) {
    const newProps = Object.keys(props).reduce((acc, key) => {
      if (key !== 'auth') {
        acc[key] = props[key];
      }
      return acc;
    }, {} as PiecePropertyMap);
    return newProps;
  }
  return {
    ...props,
    ...spreadIfDefined('auth', auth),
  };
}

function buildInputSchemaForStep(
  type: ActionType | TriggerType,
  piece: BlockMetadata | null,
  actionNameOrTriggerName: string,
): TSchema {
  switch (type) {
    case ActionType.PIECE: {
      if (
        piece &&
        actionNameOrTriggerName &&
        piece.actions[actionNameOrTriggerName]
      ) {
        return formUtils.buildSchema(
          addAuthToPieceProps(
            piece.actions[actionNameOrTriggerName].props,
            piece.auth,
            piece.actions[actionNameOrTriggerName].requireAuth,
          ),
        );
      }
      return Type.Object({});
    }
    case TriggerType.PIECE: {
      if (
        piece &&
        actionNameOrTriggerName &&
        piece.triggers[actionNameOrTriggerName]
      ) {
        return formUtils.buildSchema(
          addAuthToPieceProps(
            piece.triggers[actionNameOrTriggerName].props,
            piece.auth,
            piece.triggers[actionNameOrTriggerName].requireAuth ?? true,
          ),
        );
      }
      return Type.Object({});
    }
    default:
      throw new Error('Unsupported type: ' + type);
  }
}

function buildConnectionSchema(
  piece: BlockMetadataModelSummary | BlockMetadataModel,
) {
  const auth = piece.auth;
  if (isNil(auth)) {
    return Type.Object({
      request: Type.Composite([
        Type.Omit(UpsertAppConnectionRequestBody, ['externalId']),
      ]),
    });
  }
  const connectionSchema = Type.Object({
    externalId: Type.String({
      pattern: '^[A-Za-z0-9_:+.-@]+$',
      minLength: 1,
      errorMessage: t('Name can only contain letters, numbers and underscores'),
    }),
  });

  switch (auth.type) {
    case PropertyType.SECRET_TEXT:
      return Type.Object({
        request: Type.Composite([
          Type.Omit(UpsertSecretTextRequest, ['externalId', 'displayName']),
          connectionSchema,
        ]),
      });
    case PropertyType.BASIC_AUTH:
      return Type.Object({
        request: Type.Composite([
          Type.Omit(UpsertBasicAuthRequest, ['externalId', 'displayName']),
          connectionSchema,
        ]),
      });
    case PropertyType.CUSTOM_AUTH:
      return Type.Object({
        request: Type.Composite([
          Type.Omit(UpsertCustomAuthRequest, [
            'externalId',
            'value',
            'displayName',
          ]),
          connectionSchema,
          Type.Object({
            value: Type.Object({
              props: formUtils.buildSchema(
                (piece.auth as CustomAuthProperty<any>).props,
              ),
            }),
          }),
        ]),
      });
    case PropertyType.OAUTH2:
      return Type.Object({
        request: Type.Composite([
          Type.Omit(
            Type.Union([
              UpsertOAuth2Request,
              UpsertCloudOAuth2Request,
              UpsertPlatformOAuth2Request,
            ]),
            ['externalId', 'displayName'],
          ),
          connectionSchema,
        ]),
      });
    default:
      return Type.Object({
        request: Type.Composite([
          Type.Omit(UpsertAppConnectionRequestBody, [
            'externalId',
            'displayName',
          ]),
          connectionSchema,
        ]),
      });
  }
}

export const formUtils = {
  buildPieceDefaultValue: (
    selectedStep: Action | Trigger,
    piece: BlockMetadata | null | undefined,
    includeCurrentInput: boolean,
  ): Action | Trigger => {
    const { type } = selectedStep;
    const defaultErrorOptions = {
      continueOnFailure: {
        value:
          selectedStep.settings.errorHandlingOptions?.continueOnFailure
            ?.value ?? false,
      },
      retryOnFailure: {
        value:
          selectedStep.settings.errorHandlingOptions?.retryOnFailure?.value ??
          false,
      },
    };
    switch (type) {
      case ActionType.LOOP_ON_ITEMS:
        return {
          ...selectedStep,
          settings: {
            ...selectedStep.settings,
            items: selectedStep.settings.items ?? '',
          },
        };
      case ActionType.ROUTER:
        return {
          ...selectedStep,
        };
      case ActionType.CODE: {
        const defaultCode = `export const code = async (inputs) => {
  return true;
};`;
        return {
          ...selectedStep,
          settings: {
            ...selectedStep.settings,
            sourceCode: {
              code: selectedStep.settings.sourceCode.code ?? defaultCode,
              packageJson: selectedStep.settings.sourceCode.packageJson ?? '{}',
            },
            errorHandlingOptions: defaultErrorOptions,
          },
        };
      }
      case ActionType.PIECE: {
        const actionName = selectedStep?.settings?.actionName;
        const requireAuth = isNil(actionName)
          ? false
          : piece?.actions?.[actionName]?.requireAuth ?? true;

        const actionPropsWithoutAuth = isNil(actionName)
          ? {}
          : piece?.actions?.[actionName]?.props ?? {};
        const props = addAuthToPieceProps(
          actionPropsWithoutAuth,
          piece?.auth,
          requireAuth,
        );
        const input = (selectedStep?.settings?.input ?? {}) as Record<
          string,
          unknown
        >;
        const defaultValues = getDefaultValueForStep(
          props ?? {},
          includeCurrentInput ? input : {},
        );
        return {
          ...selectedStep,
          settings: {
            ...selectedStep.settings,
            input: defaultValues,
            errorHandlingOptions: defaultErrorOptions,
          },
        };
      }
      case TriggerType.PIECE: {
        const triggerName = selectedStep?.settings?.triggerName;
        const requireAuth = isNil(triggerName)
          ? false
          : piece?.triggers?.[triggerName]?.requireAuth ?? true;

        const triggerPropsWithoutAuth = isNil(triggerName)
          ? {}
          : piece?.triggers?.[triggerName]?.props ?? {};
        const props = addAuthToPieceProps(
          triggerPropsWithoutAuth,
          piece?.auth,
          requireAuth,
        );
        const input = (selectedStep?.settings?.input ?? {}) as Record<
          string,
          unknown
        >;
        const defaultValues = getDefaultValueForStep(
          props ?? {},
          includeCurrentInput ? input : {},
        );

        return {
          ...selectedStep,
          settings: {
            ...selectedStep.settings,
            input: defaultValues,
          },
        };
      }
      default:
        throw new Error('Unsupported type: ' + type);
    }
  },
  buildPieceSchema: (
    type: ActionType | TriggerType,
    actionNameOrTriggerName: string,
    piece: BlockMetadataModel | null,
  ) => {
    switch (type) {
      case ActionType.LOOP_ON_ITEMS:
        return Type.Composite([
          LoopOnItemsActionSchema,
          Type.Object({
            settings: Type.Object({
              items: Type.String({
                minLength: 1,
              }),
            }),
          }),
        ]);
      case ActionType.ROUTER:
        return Type.Intersect([
          Type.Omit(RouterActionSchema, ['settings']),
          Type.Object({
            settings: Type.Object({
              branches: RouterBranchesSchema(true),
              executionType: Type.Enum(RouterExecutionType),
              inputUiInfo: SampleDataSetting,
            }),
          }),
        ]);
      case ActionType.CODE:
        return CodeActionSchema;
      case ActionType.PIECE: {
        return Type.Composite([
          Type.Omit(PieceActionSchema, ['settings']),
          Type.Object({
            settings: Type.Composite([
              Type.Omit(PieceActionSettings, ['input', 'actionName']),
              Type.Object({
                actionName: Type.String({
                  minLength: 1,
                }),
                input: buildInputSchemaForStep(
                  type,
                  piece,
                  actionNameOrTriggerName,
                ),
              }),
            ]),
          }),
        ]);
      }
      case TriggerType.PIECE: {
        return Type.Composite([
          Type.Omit(PieceTrigger, ['settings']),
          Type.Object({
            settings: Type.Composite([
              Type.Omit(PieceTriggerSettings, ['input', 'triggerName']),
              Type.Object({
                triggerName: Type.String({
                  minLength: 1,
                }),
                input: buildInputSchemaForStep(
                  type,
                  piece,
                  actionNameOrTriggerName,
                ),
              }),
            ]),
          }),
        ]);
      }
      default: {
        throw new Error('Unsupported type: ' + type);
      }
    }
  },
  buildSchema: (props: PiecePropertyMap) => {
    const entries = Object.entries(props);
    const nullableType: TSchema[] = [Type.Null(), Type.Undefined()];
    const nonNullableUnknownPropType = Type.Not(
      Type.Union(nullableType),
      Type.Unknown(),
    );
    const propsSchema: Record<string, TSchema> = {};
    for (const [name, property] of entries) {
      switch (property.type) {
        case PropertyType.MARKDOWN:
          propsSchema[name] = Type.Optional(
            Type.Union([
              Type.Null(),
              Type.Undefined(),
              Type.Never(),
              Type.Unknown(),
            ]),
          );
          break;
        case PropertyType.DATE_TIME:
        case PropertyType.SHORT_TEXT:
        case PropertyType.LONG_TEXT:
        case PropertyType.COLOR:
        case PropertyType.FILE:
          propsSchema[name] = Type.String({
            minLength: property.required ? 1 : undefined,
          });
          break;
        case PropertyType.CHECKBOX:
          propsSchema[name] = Type.Union([
            Type.Boolean({ defaultValue: false }),
            Type.String({
              minLength: property.required ? 1 : undefined,
            }),
          ]);
          break;
        case PropertyType.NUMBER:
          // Because it could be a variable
          propsSchema[name] = Type.Union([
            Type.String({
              minLength: property.required ? 1 : undefined,
            }),
            Type.Number(),
          ]);
          break;
        case PropertyType.STATIC_DROPDOWN:
          propsSchema[name] = nonNullableUnknownPropType;
          break;
        case PropertyType.DROPDOWN:
          propsSchema[name] = nonNullableUnknownPropType;
          break;
        case PropertyType.BASIC_AUTH:
        case PropertyType.CUSTOM_AUTH:
        case PropertyType.SECRET_TEXT:
        case PropertyType.OAUTH2:
          // Only accepts connections variable.
          propsSchema[name] = Type.Union([
            Type.String({
              pattern: CONNECTION_REGEX,
              minLength: property.required ? 1 : undefined,
            }),
            Type.String({
              minLength: property.required ? 1 : undefined,
            }),
          ]);
          break;
        case PropertyType.ARRAY: {
          const arrayItemSchema = isNil(property.properties)
            ? Type.String({
                minLength: property.required ? 1 : undefined,
              })
            : formUtils.buildSchema(property.properties);
          propsSchema[name] = Type.Union([
            Type.Array(arrayItemSchema, {
              minItems: property.required ? 1 : undefined,
            }),
            Type.Record(Type.String(), Type.Unknown()),
            Type.String({
              minLength: property.required ? 1 : undefined,
            }),
          ]);
          break;
        }
        case PropertyType.OBJECT:
          propsSchema[name] = Type.Union([
            Type.Record(Type.String(), Type.Any()),
            Type.String({
              minLength: property.required ? 1 : undefined,
            }),
          ]);
          break;
        case PropertyType.JSON:
          propsSchema[name] = Type.Union([
            Type.Record(Type.String(), Type.Any()),
            Type.Array(Type.Any()),
            Type.String({
              minLength: property.required ? 1 : undefined,
            }),
          ]);
          break;
        case PropertyType.MULTI_SELECT_DROPDOWN:
        case PropertyType.STATIC_MULTI_SELECT_DROPDOWN:
          propsSchema[name] = Type.Union([
            Type.Array(Type.Any()),
            Type.String({
              minLength: property.required ? 1 : undefined,
            }),
          ]);
          break;
        case PropertyType.DYNAMIC:
          propsSchema[name] = Type.Record(Type.String(), Type.Any());
          break;
        case PropertyType.CUSTOM:
          propsSchema[name] = Type.Unknown();
          break;
      }

      //optional array is checked against its children
      if (!property.required && property.type !== PropertyType.ARRAY) {
        propsSchema[name] = Type.Optional(
          Type.Union(
            isEmpty(propsSchema[name])
              ? [Type.Any(), ...nullableType]
              : [propsSchema[name], ...nullableType],
          ),
        );
      }
    }
    return Type.Object(propsSchema);
  },
  getDefaultValueForStep,
  buildConnectionSchema,
};

export function getDefaultValueForStep(
  props: PiecePropertyMap | OAuth2Props,
  existingInput: Record<string, unknown>,
  customizedInput?: Record<string, boolean>,
): Record<string, unknown> {
  const defaultValues: Record<string, unknown> = {};
  const entries = Object.entries(props);
  for (const [name, property] of entries) {
    switch (property.type) {
      case PropertyType.CHECKBOX: {
        defaultValues[name] =
          existingInput[name] ?? property.defaultValue ?? false;
        break;
      }
      case PropertyType.ARRAY: {
        const isCustomizedArrayOfProperties =
          !isNil(customizedInput) &&
          customizedInput[name] &&
          !isNil(property.properties);
        const existingValue = existingInput[name];
        if (!isNil(existingValue)) {
          defaultValues[name] = existingValue;
        } else if (isCustomizedArrayOfProperties) {
          defaultValues[name] = {};
        } else {
          defaultValues[name] = property.defaultValue ?? [];
        }
        break;
      }
      case PropertyType.MARKDOWN:
      case PropertyType.DATE_TIME:
      case PropertyType.SHORT_TEXT:
      case PropertyType.LONG_TEXT:
      case PropertyType.FILE:
      case PropertyType.STATIC_DROPDOWN:
      case PropertyType.DROPDOWN:
      case PropertyType.BASIC_AUTH:
      case PropertyType.CUSTOM_AUTH:
      case PropertyType.SECRET_TEXT:
      case PropertyType.CUSTOM:
      case PropertyType.COLOR:
      case PropertyType.OAUTH2: {
        defaultValues[name] = existingInput[name] ?? property.defaultValue;
        break;
      }
      case PropertyType.JSON: {
        defaultValues[name] = existingInput[name] ?? property.defaultValue;
        break;
      }
      case PropertyType.NUMBER: {
        defaultValues[name] = existingInput[name] ?? property.defaultValue;
        break;
      }
      case PropertyType.MULTI_SELECT_DROPDOWN:
        defaultValues[name] = existingInput[name] ?? property.defaultValue;
        break;
      case PropertyType.STATIC_MULTI_SELECT_DROPDOWN:
        defaultValues[name] = existingInput[name] ?? property.defaultValue;
        break;
      case PropertyType.OBJECT:
      case PropertyType.DYNAMIC:
        defaultValues[name] =
          existingInput[name] ?? property.defaultValue ?? {};
        break;
    }
  }
  return defaultValues;
}
