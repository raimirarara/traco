import { db } from "../firebase/firebase";

const useCountryUsers = async (selectCountry: string) => {
  const countryUsers: string[] = [];
  await db
    .collection("users")
    .where("countries", "array-contains", selectCountry)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        countryUsers.push(doc.data().username);
        console.log(countryUsers);
      });
    });
  return countryUsers;
};
export default useCountryUsers;
