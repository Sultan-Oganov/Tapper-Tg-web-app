export async function getTestToken() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = String(1048220739);
    localStorage.setItem("userId", userId);
  }
  const res = await fetch(`https://cryptosteron.com/api/test?userId=${userId}`);
  const data = await res.json();
  return data.token;
}
