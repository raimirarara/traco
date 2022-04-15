import { db } from "../firebase/firebase";

const useCountryUsers = async (myname: string, selectCountry: string) => {
  const countryUsers: string[] = [];
  await db
    .collection("users")
    .where("countries", "array-contains", selectCountry)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        if (myname != doc.data().username) {
          countryUsers.push(doc.data().username);
        }
      });
    });
  return countryUsers;
};
export default useCountryUsers;
