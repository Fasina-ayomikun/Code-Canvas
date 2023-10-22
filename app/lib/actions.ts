export const uploadImage = async (imageUrl: string) => {
  try {
    const response = fetch("http://localhost:3000/api/upload/upload-pic", {
      method: "POST",
      body: JSON.stringify({ path: imageUrl }),
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (form) => {
  try {
    const image = uploadImage(form?.image);
    if (image) {
      form.image = image;
      try {
        const response = await fetch(
          `http://localhost:3000/api/auth/update-profile/${form?.userId}`,
          {
            method: "PATCH",
            body: JSON.stringify(form),
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
