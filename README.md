# Tutor-Student Interactive Platform

## Overview
Our platform facilitates seamless interaction between tutors and students by providing an intelligent system to manage class discussions.
Tutors can create rooms for classes, students can join and participate by commenting, and our system processes these interactions to 
identify relevant questions for the tutor. 

The key features of the platform include:
1. Spam detection using an NLP model.
2. Relevance assessment using a sentence similarity model (cosine similarity).
3. A streamlined interface for tutors to focus on pertinent questions.

## Features

### 1. *Room Creation*
- Tutors can create virtual rooms for their classes.
- Each room includes a description of the content to be taught.

### 2. *Student Interaction*
- Students can join rooms and post comments or questions.
- Comments are analyzed to identify spam and non-spam content.

### 3. *Spam Detection*
- An NLP model processes all comments to classify them as spam or non-spam.
- Only non-spam questions are considered for relevance analysis.

### 4. *Relevance Analysis*
- Non-spam questions are compared against the content provided by the tutor while creating the room.
- A sentence similarity model (using cosine similarity) determines the relevance of each question to the class content.

### 5. *Simplified Tutor Workflow*
- Tutors can click the "Show Questions" button to view a filtered list of relevant questions.
- This allows tutors to focus on addressing meaningful queries without navigating through irrelevant or spam comments.

## System Workflow

1. *Room Creation*:
   - Tutors provide a description of the class content while creating a room.

2. *Student Comments*:
   - Students post comments/questions in the room.

3. *Spam Filtering*:
   - Comments are passed through an NLP model to detect and filter out spam.

4. *Relevance Assessment*:
   - Non-spam questions are compared to the tutor-provided content using a sentence similarity model.
   - The cosine similarity score determines how relevant a question is to the class content.

5. *Question Display*:
   - Tutors click the "Show Questions" button to see a curated list of relevant questions.
   - This ensures efficient management of student queries.

## Technologies Used

- *Backend*: Javascript, Flask/Django, NodeJs
- *Frontend*: HTML, CSS, JavaScript, React
- *Database*: MongoDB
- *NLP Models*:
  - Spam Detection: Pre-trained transformer-based model
  - Sentence Similarity: Cosine similarity with embeddings (e.g., Sentence-BERT)
- *Hosting*: AWS/Google Cloud

## Installation

1. Clone the repository:
   bash
   git clone https://github.com/RutikRC/chat-relevancy-finder-frontend.git
   
2. Navigate to the project directory:
   bash
   cd chat-relevancy-finder-frontend
   
3. Install dependencies:
   bash
   pip install -r requirements.txt
   
4. Run the application:
   bash
   python app.py
   

## Usage

1. Log in as a tutor or student.
2. Tutors can create rooms and provide class content.
3. Students join rooms and post comments.
4. Tutors click "Show Questions" to view relevant questions.

## Contribution

We welcome contributions from the community. To contribute:
1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes and push them to your fork.
4. Open a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For inquiries or support, please contact us at support@tutorplatform.com.
