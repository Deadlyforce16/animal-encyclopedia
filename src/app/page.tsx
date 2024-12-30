export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to my Animal Encyclopedia!</h1>
      <div className="intro-section">
        <p>
          This is a Internet Programming Web Applicaiton Project that I made in Visual Studio Code using Next.js as the frontend and JSON Server as the backend. 
          My web application allows you to:
        </p>
        <ul>
          <li>Browse detailed information about various animal species</li>
          <li>Learn about their scientific name, taxonomy, location, characteristics and description</li>
          <li>Join our community of animal enthusiasts</li>
          <li>Share your knowledge,experiences and thoughts through comments</li>
        </ul>
        <h2>How to use this web application?</h2>
        <ul>
          <li>
            You can also add your own animals to the database by going to the Animals page and clicking the <b>&quot;Add New Animal&quot;</b> button. 
            Additionally, you can also search for animals by their name, scientific name, taxonomy and location. And you can also sort them by their name, scientific name, taxonomy and location as well.
            Accordingly you can edit or delete your own animals by clicking the <b>&quot;Edit&quot;</b> or <b>&quot;Delete&quot;</b> button.
          </li>
          <li>
            You can also add your own users to the database by going to the Users page and clicking the <b>&quot;Add New User&quot;</b> button.
            Accordingly you can edit or delete your own users by clicking the <b>&quot;Edit&quot;</b> or <b>&quot;Delete&quot;</b> button.
          </li>
          <li>
            You can also add your own comments to the database by going to the Comments page and clicking the <b>&quot;Add New Comment&quot;</b> button.
            Accordingly you can edit or delete your own comments by clicking the <b>&quot;Edit&quot;</b> or <b>&quot;Delete&quot;</b> button.
          </li>
        </ul>
        <p>
          <b>NOTE: </b>
          If you add a comment and then delete the user or animal associated with it, the comment will be deleted accordingly.
          And you can also not add a picture to your user or animal profile because there is a default picture for each user and animal.
        </p>
      </div>
    </div>
  );
}
