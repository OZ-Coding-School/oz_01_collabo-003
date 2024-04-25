import axios from "../api/axios";

async function fetchValidation(
  url: string,
  data: object,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  successMessage: string
) {
  try {
    await axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          setMessage("");
          setIsValid(false);
          alert(successMessage);
        }
        console.log(response);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setMessage("이미 존재하는 정보입니다");
        } else {
          setMessage("확인 중 오류가 발생했습니다");
        }
        console.log(error.response.data);
      });
  } catch (error) {
    console.log(error);
  }
}
export default fetchValidation;
