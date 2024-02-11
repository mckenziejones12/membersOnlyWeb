export const LoginForm = ({ onSubmit }) => {
  // some code

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        placeholder="enter your username"
      ></input>
      <br />
      <input
        type="password"
        name="password"
        placeholder="enter your password"
      ></input>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
