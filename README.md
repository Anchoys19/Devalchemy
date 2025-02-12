# DevAlchemy

Web platform that allows users create, manage and complete quests with interactive tasks. 


## Authors

- [@Smegalex](https://github.com/Smegalex)
- [@anuri-el](https://github.com/anuri-el)
- [@Anchoys19](https://github.com/Anchoys19)
- [@nectakin](https://github.com/nectakin)



## Deployment

To deploy this project run

```bash
  npm run dev
```


## Features

- Live previews
- Fullscreen mode
- Cross platform


## Installation

Install Devalchemy with npm

```bash
  npm install Devalchemy
  cd Devalchemy
```
    
## Lessons Learned

What did you learn while building this project?

While building this project, a valuable experience was gained in designing a structured and user-friendly interface for interactive quest creation. On the frontend, we improved our understanding of UI/UX principles, particularly in designing multi-step forms, handling multimedia integration like text. We also learned how to balance a cyberpunk aesthetic with usability, making sure that neon elements did not overpower readability.

On the backend, we learned how to handle dynamic quest creation and storage efficiently. Implementing logic for managing different types of quest tasks (open-ended, multiple-choice) required careful structuring of API endpoints and validation mechanisms.

For the database, we learned about designing a flexible schema to support quests, tasks, user progress, and multimedia elements. Proper indexing and data relationships were crucial to ensure fast retrieval and scalability.

What challenges did you face and how did you overcome them?

One of the main frontend challenges was ensuring a visually striking cyberpunk design without sacrificing functionality. Neon-heavy designs can become overwhelming, so we refined color contrasts, typography, and layout to maintain clarity. Additionally, structuring the "New Quest" page to be feature-rich yet intuitive required careful placement of buttons and form fields to avoid overwhelming the user.

On the backend, handling real-time interactions and dynamic content updates was a challenge. We optimized API calls to ensure smooth data handling and minimized unnecessary re-renders on the frontend. Error handling was also a key focus, ensuring that incorrect or incomplete quest submissions provided helpful feedback to users.

For the database, designing a flexible and scalable structure was complex. Since quests could contain various types of tasks with different multimedia elements, we needed a well-structured schema. Using SQL, we ensured efficient indexing and relations between quests, tasks, and users. Caching strategies were implemented to speed up frequent queries.

By iterating on UI/UX improvements, optimizing API responses, and refining the database structure, we were able to overcome these challenges and create a smooth, engaging experience for users.

