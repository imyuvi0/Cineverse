function Profile() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    alert("Logged Out");
    window.location.reload();
  };

  if (!token) {
    return <h2>Please Login First</h2>;
  }

  return (
    <div>
      <h1>Profile</h1>

      <p>Welcome, {username}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;