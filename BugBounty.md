# AIxBlock Bug Bounty Program

Welcome to the **AIxBlock.io Bug Bounty Program** – our open invitation to the security community to help us keep the first unified, decentralized AI‑and‑automation platform safe for everyone. We reward actionable research that keeps our users’ AI workflows, automation pipelines, data and Solana‑based resources secure.

> **Important:** All bounty activity must take place publicly in our repository:
> [https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public](https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public)

---

## Table of Contents

1. [Overview](#overview)
2. [Scope](#scope)
3. [Out of Scope](#out-of-scope)
4. [Rules of Engagement](#rules-of-engagement)
5. [Reporting Process](#reporting-process)
6. [Severity and Rewards](#severity-and-rewards)
7. [Response Targets](#response-targets)
8. [Future Benefits](#future-benefits)
9. [Contact](#contact)

---

## Overview

**Objective — Security Through Openness**
AIxBlock combines decentralized compute, open‑source models, data engines and human validators into a low‑code environment for end‑to‑end AI and workflow automation. Our goal is to **identify and remediate vulnerabilities quickly and transparently** while crediting and rewarding the researchers who make that possible.

* All vulnerability discussion and fixes are public (issues & PRs).
* Rewards scale with **impact *and* fix quality** – submit the bug **and** a working patch to maximize your payout.
* We follow the \[CVSS v3.1] qualitative scale for severity (see footnote 1).

---

## Scope

| Domain                       | Type                   | Asset Value  | Description                                                           |
| ---------------------------- | ---------------------- | ------------ | --------------------------------------------------------------------- |
| `app.aixblock.io`            | Web App                | **High**     | Primary UI for AI & automation workflows.                             |
| `api.aixblock.io`            | API                    | **Critical** | Model management & workflow execution endpoints (`/api/*`).           |
| `*.aixblock.io`              | Wildcard               | **Low**   | All first‑party sub‑domains (docs, staging, etc.).                    |
| `webhook.aixblock.io`        | Webhook                | **Medium**     | Inbound hooks powering third‑party integrations.                      |
| `mcp.aixblock.io`            | MCP Layer              | **Medium**   | Connectors to third‑party tools (Cursor, Claude, WindSurf, …).        |
| `workflow.aixblock.io`       | Workflow Engine        | **Critical** | Core service for building & running automation workflows.             |

### Out of Scope

* Third‑party services we don’t control (e.g. Solana L1, Hugging Face, Roboflow).
* DoS / DDoS or spam/flood tests.
* UI bugs with **no** security impact.
* Proprietary/private models or data not present in the public repo.

---

## Rules of Engagement

* **Be lawful & respectful** – no social engineering, physical attacks, or privacy violations.
* **Only test with accounts you own** or explicit permission.
* **No public disclosure until the fix is merged** (see timeline below).
* Chain or duplicate vulnerabilities = one bounty.
* First valid report wins if duplicates occur.

## Eligibility

Anyone can participate **except**:

* Current AIxBlock employees or contractors.


---

## Reporting Process

Submit vulnerabilities as issues on the public repository at [https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public](https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public). Follow these essential steps:

1. **Star the Repository (mandatory):** Stay updated and show your engagement.
2. **Fork the Repository (mandatory):** Fork to contribute, keep track of your changes and use as a proof to claim tokens later as well as to receive long term revenue sharing in the future.
3. **Submit Report:**

   * Create an issue using the "Bug Report" template (if available), and include:

     * 🔍 **Vulnerability description**
     * 🧠 **Impact assessment (should be concise)**
     * 📸 **Screenshots or video evidence**
4. **Discussion (optional, but encouraged):**

   * Create a dedicated branch (e.g., `bugfix/issue-123`) to collaborate on your proposed fix.
   * Engage with the AIxBlock team and the community via comments on the issue or pull request.
5. **Fix bug/propose solutions and pull PR request :**

   * Submit a pull request (PR) to the discussion branch.
   * Reference the original issue in your PR.
   * Include description of the fix in your PR description.
6. **AIxBlock Responds:**

   * The AIxBlock Security Team will acknowledge your submission within **48 hours**.
7. **AIxBlock Validates:**

   * Vulnerabilities are validated within **7 business days**.
   * Severity and reward are confirmed after validation.
8. **Disclosure:**

   * Once the fix is live and merged, public disclosure is permitted with **AIxBlock’s approval**.


---

## Severity and Rewards

| Severity     | CVSS Range | Examples                                                                                      | Reward (USD + Token)\*                                        |
| ------------ | ---------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Critical** | 9.0 – 10.0 | Remote Code Execution (RCE), Smart Contract logic flaws causing asset loss, Data leakage of AI models or automation workflow data, Unauthorized workflow execution | **\$750** cash + 1,500  worth of AIxBlock token & rev‑share |
| **High**     | 7.0 – 8.9  | Server-Side Request Forgery (SSRF), Authentication Bypass, Unauthorized access to decentralized compute or workflow triggers                          | **\$450** cash + 1,000 worth of token & rev‑share          |
| **Medium**   | 4.0 – 6.9  | Cross-Site Scripting (XSS), CSRF affecting workflow actions, Webhook misconfiguration                                              | **\$200** cash + 500 worth of token & rev‑share            |
| **Low**      | 0.1 – 3.9  | Minor configuration errors, Non-impactful XSS, Non-sensitive information disclosure                                                      | 200 worth of token & rev‑share                             |

\***Token: payouts redeemable on or one day after TGE.**

⚠️ **Note**: To be eligible for the **full reward**, researchers must not only report the vulnerability but also submit a **valid Pull Request (PR)** that includes a **concrete fix directly in our open-source codebase**. PRs must contain an **actual code-level resolution** (not just a placeholder, comment, or general suggestion) that addresses the root cause of the issue. Submissions that only create a PR to satisfy process requirements without providing a real fix or actionable change in code will **not be considered for full rewards**.
If only a report is submitted **without a valid code fix**, or the PR does **not provide a working solution**, the researcher will receive **50% of the listed reward**.

**Bonus:** Additional for reports with detailed PoCs or vulnerabilities found in new features (e.g., automation workflows, MCP integration, decentralized compute).

**No Reward:** Duplicate reports, out-of-scope issues, or vulnerabilities with no security impact.

**Payments:** Cash Rewards can be paid via either bank transfer in fiat currency or in stablecoins (USDC) as cryptocurrency payment, distributed at the end of the bounty campaign once the total cash rewards pool reaches 10,000 USD, will be announced publicly on all of our channels. Token rewards shall be distributed on our TGE date or 1 day after our TGE date. Please follow us to make sure you don't miss it.

Total pool: **\$10 000** cash + 30 000 worth of AIxBlock tokens.

---

## Response Targets

| Stage             | Target SLA                                                    |
| ----------------- | ------------------------------------------------------------- |
| Acknowledgement   | **< 48 h**                                                    |
| Triage & Severity | **≤ 7 business days**                                         |

---

## Future Benefits

Additional opportunities to claim tokens on our TGE date and receive long-term revenue sharing.

---

## Contact

- **Discord**: [Join Us](https://discord.gg/nePjg9g5v6)
- **Twitter**: [Follow Us](https://x.com/AixBlock)
- **Telegram**: [Join the Discussion](https://t.me/AIxBlock)
- **LinkedIn**: [Follow Us](https://www.linkedin.com/company/aixblock/)
- **YouTube**: [Watch Our Channel](https://www.youtube.com/@AIXBlock)
- **Website**: https://aixblock.io
- **Platform**: https://app.aixblock.io
- **Huggingface**: https://huggingface.co/AIxBlock.

---

## 🏆 Rewarded Reports

| User         | Report Title                                               | Domain              | Severity     | Status   | Reward     |
| ------------ | ---------------------------------------------------------- | ------------------- | ------------ | -------- | ---------- |
| [@0XZAMAJ](https://github.com/0XZAMAJ) | Unauthorized Deletion of Other Users’ Profile Pictures | `api.aixblock.io` | High       | Accepted | $225 cash + 500 worth of token & rev‑share     |
| [@0xygyn-X](https://github.com/0xygyn-X)  | Insecure Direct Object Reference (IDOR) Vulnerability on "Account Settings --> Organizations" exposing organization & Admin PII | `api.aixblock.io` | High       | Accepted | $450 cash + 1000 worth of token & rev‑share     |
| [@eMKayRa0](https://github.com/eMKayRa0)    | Security Bug Report – Reflected Cross-Site Scripting (XSS) on app.aixblock.io      | `app.aixblock.io`   | High       | Accepted | $225 cash + 500 worth of token & rev‑share      |
| [@pravinkumar-exe](https://github.com/pravinkumar-exe)    | Missing Email Verification Grants Full Account Access      | `*.aixblock.io`   | Low       | Accepted |  100 worth of token & rev‑share      |
| [@0xygyn-X](https://github.com/0xygyn-X)    | PRIVILEGE ESCALATION to AIxBlock SUPER_ADMIN      | `app.aixblock.io`   | Low       | Accepted |  100 worth of token & rev‑share      |
| [@sonw-vh](https://github.com/sonw-vh)    | Stored XSS via SVG file upload in label-and-validate-data and fine-tune-and-deploy projects → Data Preparation module      | `app.aixblock.io`   | Medium       | Accepted |  $200 cash + worth of token & rev‑share       |
| [@comradeflats](https://github.com/comradeflats)    | CRITICAL: Path Traversal Authentication Bypass Exposes 1,388+ Admin Projects with Tokens      | `*.aixblock.io`   | Medium       | Accepted |  $100 cash + 250 worth of token & rev‑share      |
| [@aybanda](https://github.com/aybanda)    | Security Bug Report – Stored XSS in General Editor (Production)      | `workflow.aixblock.io`   | High       | Accepted |  $450 cash + 1000 worth of token & rev‑share      |
| [@Wizard0fthedigitalage](https://github.com/Wizard0fthedigitalage)    | Rate Limiting bypass on Login Endpoint via IP Rotation and null byte characters on alxblock      | `app.aixblock.io`   | Low       | Accepted |  100 worth of token & rev‑share      |
| [@eMKayRa0](https://github.com/eMKayRa0)    | Vulnerability Report: Session Mismanagement / Broken Authentication in Profile Update Endpoint      | `app.aixblock.io`   | High       | Accepted |  $225 cash + 500 worth of token & rev‑share      |
| [@0xygyn-X](https://github.com/0xygyn-X)    | API Rate-Limit Restriction (3 request maximum) Bypass using Race Condition      | `app.aixblock.io`   | Low       | Accepted |  100 worth of token & rev‑share      |



### Footnotes

1. *CVSS v3.1 Severity Rating Scale* – FIRST.org.
