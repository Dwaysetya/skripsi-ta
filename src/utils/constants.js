const isLogin = localStorage.getItem("isLogin");

if (isLogin === "true") {
  console.log("Pengguna sudah login");
} else {
  console.log("Pengguna belum login");
}
