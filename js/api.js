const API = (() => {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }

  function post(path, info) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      headers,
      body: JSON.stringify(info),
      method: "POST",
    });
  }

  async function reg(userInfo) {
    const resp = await post("/api/user/reg", userInfo);
    return await resp.json();
  }

  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const body = await resp.json();
    //保存token
    if (body.code === 0) {
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return body;
  }

  async function exists(loginId) {
    const resp = await get(`/api/user/exists?loginId=${loginId}`);
    return await resp.json();
  }

  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  async function sendChat(content) {
    const resp = await post("/api/chat", { content });
    return await resp.json();
  }

  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
