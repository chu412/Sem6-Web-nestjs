function LogIn() {
  var username = document.querySelector('.navbox_input_user').value;
    if (username.trim() === '') {
      alert('Write something!');
      return;
    }
  
    document.cookie = 'logged=true';
    document.cookie = 'username=' + username;
    location.reload();
  }
  
  function LogOut() {
    document.cookie = 'logged=false';
    document.cookie = 'username=';
    location.reload();
  }