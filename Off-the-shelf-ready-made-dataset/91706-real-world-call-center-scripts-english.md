This dataset includes **91,706 high-quality transcriptions** corresponding to approximately **10,500 hours** of **real-world call center conversations** in **English**, collected across various industries and global regions. The dataset features both **inbound and outbound** calls and spans multiple accents, including **Indian**, **American**, and **Filipino** English. All transcripts have been **carefully redacted for PII** and enriched with **word-level timestamps** and **ASR confidence scores**, making it ideal for training robust speech and language models in real-world scenarios.

* 🗣️ **Language & Accents**: English (Indian, American, Filipino)
  
* 📞 **Call Types**: Inbound and outbound customer service conversations
  
* 🏢 **Source**: Sourced via partnerships with BPO centers across a range of industries
  
* 🔊 **Audio Length**: 10,500+ hours of corresponding real-world audio (not included in this release)
  
* 📄 **Transcripts**: 91,706 JSON-formatted files with:

  * Word-level timestamps
    
  * ASR confidence scores
    
  * Categorized by domain, topic, and accent
    
  * Redacted for privacy

🔧 **Processing Pipeline**:

1. Raw, uncompressed audio was downloaded directly from BPO partners to maintain acoustic integrity.

2. Calls were tagged by **domain**, **accent**, and **topic** (inbound vs outbound).

3. Transcription was done using **AssemblyAI’s paid ASR model**.

4. Transcripts and audios were **redacted for PII** based on the following list:

   ```
   account_number, banking_information, blood_type, credit_card_number, credit_card_expiration, 
   credit_card_cvv, date, date_interval, date_of_birth, drivers_license, drug, duration, 
   email_address, event, filename, gender_sexuality, healthcare_number, injury, ip_address, 
   language, location, marital_status, medical_condition, medical_process, money_amount, 
   nationality, number_sequence, occupation, organization, passport_number, password, person_age, 
   person_name, phone_number, physical_attribute, political_affiliation, religion, statistics, 
   time, url, us_social_security_number, username, vehicle_id, zodiac_sign
   ```

5. A manually QA’d subset was used to calculate **word error rate (WER)**, with the overall transcription accuracy estimated at **96.131%**.

6. Final output is provided in **JSON format**, with cleaned and standardized fields.

📜 **Paper Coming Soon**: A detailed paper describing the full pipeline, challenges, and benchmarks will be released on **arXiv**.

📣 **Want Updates?** Drop a comment in the **community section** to be notified when the paper goes live.

🔐 **License**: Provided **strictly for research and AI model development**. **Commercial use, resale, or redistribution is prohibited.**

**Link to download** : https://huggingface.co/datasets/AIxBlock/91706-real-world-call-center-scripts-english

🎓 **Brought to you by AIxBlock** – *a decentralized platform for AI development and workflow automations, with a commitment to enabling the development of fair, accurate, and responsible AI systems through high-quality open datasets.*
