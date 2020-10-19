import userInstance from "../apis/users";

export async function login(email, password) {
  const response = await userInstance.post("/login", {
    email: email,
    password: password,
  });

  return response;
}
