**Breaking: AIxBlock transitions to open-source. Please follow us for more updates. Here is a brief overview of our project.**
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# AIxBlock


**The first unified platform for end-to-end Al development and workflow automation — MCP compatible**

---

## 🚀 What is AIxBlock?
AIxBlock is the first unified platform for end-to-end AI development and workflow automation — modular, interconnected, and built for custom AI. Powered by MCP and decentralized resources, it lets you build & deploy custom models, automate AI workflows, and monetize every step.
Modular, interconnected, and built for custom AI, it's designed for AI engineers and dev teams who want everything in one stack:
- **Data Engine**:
Unified pipeline for data crawling, curation, and automated large-scale labeling with humans in the loop, supporting any kinds of models including multimodal.
- **Low-Code AI Workflow Automation**:
Create and manage any AI workflow automation. You can also train/fine-tune AI models directly on workflows
- **Distributed Parallel Training (with MoE Support)**:
Train AI models across decentralized compute nodes with auto-configuration, MoE model support.
- **Decentralized Compute Marketplace**:
Access a global pool of underutilized GPU resources at zero margin, enabling cost-effective, scalable AI training.
- **Decentralized Model Marketplace**: 
Buy, sell, and reuse fine-tuned models within a peer-powered ecosystem — accelerating innovation and monetization.
- **Decentralized automation workflow templates Pool**:
AIxBlock lets you monetize your AI automation workflows—whether they're built on AIxBlock, Make.com, Zapier, or n8n.
- **MCP Integration Layer**:
Easily connect AIxBlock’s AI ecosystem to third-party environments and dev platforms that support MCP — enabling flexible workflows across apps and IDEs.


---

## 🌟 How Does It Work ?
 [Curate Data] → [Label] → [Train] → [Deploy] → [Use/Automate]  → [Monetize]
 
①  Bring Your Data or Use our Crawler
- Collect, curate, and label structured or unstructured data — all in one place.
- Use our built-in Data Crawler or pull from data from: local files, your storage, GitHub, Hugging Face, Roboflow, Kaggle, and any other apps
- Tap into a global workforce of 170,000+ labelers
Coming soon: Decentralized data pool

② Label It Your Way
- Define your own input/output dataset formats. Customize your labeling UI including multimodal.
- Support  all data format, including multimodals (Images | Text | Audio | Video | Multimodal).

③  Train at Scale
- Train your custom models at scale — without setting up your own infrastructure.
- Distributed Data Parallel (DDP) built-in
- Built in MLOps tools
- Auto training & active learning optimization
- Connect to Hugging Face, Git, Roboflow, S3, etc — pull and store models easily

④ Use Decentralized Resources
- On-Demand High-End Compute at up to 90% cheaper
- Global Labeling Workforce across 100+ Countries
- Pre-trained AI/ML Models Marketplace 
- AI Dataset Pool (soon)
⑤  Deploy models
- Test models in a built-in real-time demo environment & Deploy them using decentralized high performance compute

⑥ Automate Workflows
- Build AI automation workflows with your custom models:
- Use our our built-in AI automation workflow builder to connect models to APIs, CRMs, and any apps/environment of your choice
- Use your own models or rent from the marketplace — full flexibility, zero vendor lock-in

⑦ Monetize It All
- Turn every part of your workflow into income.
- Monetize your models
- Rent out idle GPU compute
- Offer services (labeling, fine-tuning, automation)
- Monetize AI automation workflow templates no matter where did you build it (n8n, make.com, zapier, etc)
- (Coming soon) Contribute datasets

---

## 🛠️ Getting Started

1. **Requirements:**

   - Python 3.10
   - [NVM](https://github.com/nvm-sh/nvm)
   - PostgreSQL
   - Redis
   - Nodejs 18.19.0
2. **Clone the Repository**:

   ```bash
   git clone https://github.com/<your-org>/aixblock.git
   cd aixblock
   ```

3. **Install Dependencies**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate     # On Windows
   ```
   
   Install dependencies from `requirements.txt`:

   ```bash
   pip install -r requirements.txt
   ```

   Copy the example environment file and generate a random secret key:

   ```bash
   cp .env.example .env
   # Generate a random SECRET_KEY and replace the placeholder in .env
   
   sed -i '' -e "/^SECRET_KEY=/s/=.*/=`openssl rand -hex 32`/" .env > /dev/null 2>&1
   ```
   Install pnpm
   ```bash
   npm install -g pnpm@latest-10
   ```

   Set max_user_watcher
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
   ```

4. **Workflow**:

   Install dependencies for the first time

   ```bash
   make install-workflow
   ```

   Run workflow

   ```bash
   make workflow-engine    # 1st terminal
   make workflow-backend   # 2nd terminal
   make workflow-frontend  # 3rd terminal
   ```

5. **Run the Platform**:

   Setup project for the first time

   ```bash
   make setup
   ```

   Run the project - open two terminals

   ```bash
   make worker  # 1st terminal
   make run     # 2nd terminal
   ```

   **Note**: Always run the workflow before the platform to avoid database lock.

---

## 🤝 How to Contribute

1. Check the [Issues](#) for open tasks.
2. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Submit a Pull Request with detailed notes.

---

## 🎁 Community Contribution Rewards

- Earn points for every meaningful contribution.
- Be part of our long-term profit-sharing ecosystem for every single contribution.



---

## 💬 Join the Community

- **Discord**: [Join Us](https://discord.gg/nePjg9g5v6)
- **Twitter**: [Follow Us](https://x.com/AixBlock)
- **Telegram**: [Join the Discussion](https://t.me/AIxBlock)
- **LinkedIn**: [Follow Us](https://www.linkedin.com/company/aixblock/)
- **YouTube**: [Watch Our Channel](https://www.youtube.com/@AIXBlock)
- **Website**: https://aixblock.io
- **Platform**: https://app.aixblock.io
- **Huggingface**: https://huggingface.co/AIxBlock

---
## 🔖 Keywords
ai, llm, decentralized-ai, generative-ai, asr, computer-vision, nlp, privacy, security, open-source, distributed-computing, ddp, distributed-training, distributed-data-parrallel, self-hosted-ai platform, decentralized-dataset-pool, self-hosted-labeling-tool, self-hosted-ai-deployment, fine-tuning, ai-development-platform, ai-production-platform

---
## ⭐ Show Your Support

Give this repository a ⭐ and share it with your network to help grow the AIxBlock community.

## Thank you our below contributors:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.google.com/search?sca_esv=dca996cfbce33230&authuser=0&hl=pl&gl=pl&output=search&q=PRIME+Sp.+z+o.o.&ludocid=17467329443996292901&lsig=AB86z5X0Bf-JfNWCbOR92pcX_xaJ&ved=1i%3A4%2Ct%3A109124%2Ce%3A3%2Cp%3Adv0BZvi9JvuSxc8PjMeKsA8%3A51"><img src="https://avatars.githubusercontent.com/u/119964285?v=4?s=100" width="100px;" alt="TESLA-SATI"/><br /><sub><b>TESLA-SATI</b></sub></a><br /><a href="https://github.com/AIxBlock-2023/awesome-ai-dev-platform-opensource/commits?author=TESLA-SATI" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/eMKayRa0"><img src="https://avatars.githubusercontent.com/u/106302120?v=4?s=100" width="100px;" alt="eMKayRao"/><br /><sub><b>eMKayRao</b></sub></a><br /><a href="#security-eMKayRa0" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/0XZAMAJ"><img src="https://avatars.githubusercontent.com/u/215890246?v=4?s=100" width="100px;" alt="0XZAMAJ"/><br /><sub><b>0XZAMAJ</b></sub></a><br /><a href="#security-0XZAMAJ" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pravinkumar-exe"><img src="https://avatars.githubusercontent.com/u/52107447?v=4?s=100" width="100px;" alt="pravinkumar-exe"/><br /><sub><b>pravinkumar-exe</b></sub></a><br /><a href="#security-pravinkumar-exe" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/priyanshukumar397"><img src="https://avatars.githubusercontent.com/u/54209223?v=4?s=100" width="100px;" alt="priyanshukumar397"/><br /><sub><b>priyanshukumar397</b></sub></a><br /><a href="#security-priyanshukumar397" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/0xygyn-X"><img src="https://avatars.githubusercontent.com/u/215982257?v=4?s=100" width="100px;" alt="0xygyn-X"/><br /><sub><b>0xygyn-X</b></sub></a><br /><a href="#security-0xygyn-X" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/big14way"><img src="https://avatars.githubusercontent.com/u/115630820?v=4?s=100" width="100px;" alt="Godswill Idolor"/><br /><sub><b>Godswill Idolor</b></sub></a><br /><a href="#security-big14way" title="Security">🛡️</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://cv-sonwday.web.app"><img src="https://avatars.githubusercontent.com/u/99324997?v=4?s=100" width="100px;" alt="s.0wn"/><br /><sub><b>s.0wn</b></sub></a><br /><a href="#security-sonw-vh" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FCGitUser"><img src="https://avatars.githubusercontent.com/u/122260273?v=4?s=100" width="100px;" alt="FCGitUser"/><br /><sub><b>FCGitUser</b></sub></a><br /><a href="#security-FCGitUser" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ryanwinstonelliott.com"><img src="https://avatars.githubusercontent.com/u/81211706?v=4?s=100" width="100px;" alt="Ryan E. "/><br /><sub><b>Ryan E. </b></sub></a><br /><a href="#security-comradeflats" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AbhishekKumar9430"><img src="https://avatars.githubusercontent.com/u/158041237?v=4?s=100" width="100px;" alt="AbhishekKumar9430"/><br /><sub><b>AbhishekKumar9430</b></sub></a><br /><a href="#security-AbhishekKumar9430" title="Security">🛡️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Proxypentest"><img src="https://avatars.githubusercontent.com/u/216752274?v=4?s=100" width="100px;" alt="proxypentest"/><br /><sub><b>proxypentest</b></sub></a><br /><a href="#security-Proxypentest" title="Security">🛡️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
