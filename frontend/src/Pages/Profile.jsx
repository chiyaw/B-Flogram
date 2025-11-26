import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Navigation from "../Components/Navigation";
import axios from "axios";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Space, Switch } from "antd";
import { format } from "date-fns/format";
import ProfilePost from "../Components/ProfilePost";
function Profile() {
  const userId = localStorage.getItem("userId");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [bio, setBio] = useState("");
  const [privateAccount, setPrivateAccount] = useState(false);

  useEffect(() => {
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    axios
      .get(`http://localhost:3001/api/profile/${userId}`)
      .then((response) => {
        console.log("✅ Profile data fetched:", response.data);

        const userData = response.data.user; // Access the user object

        setFollowers(userData.followers ? userData.followers.length : 0);
        setFollowing(userData.followings ? userData.followings.length : 0);

        setUserName(userData.user); // This is the username string
        setProfilePic(userData.profilePic || "");
        
        // Only format date if it exists
        if (userData.createdAt) {
          setCreatedAt(format(new Date(userData.createdAt), "dd-MM-yyyy"));
        }
        
        setBio(userData.bio || "");
        setPrivateAccount(userData.privateAccount || false);

        console.log("Its Happening");
      })
      .catch((error) => {
        console.error("❌ Error fetching profile:", error);
      });
  }, [userId]);
  return (
    <>
      <div>
        <Header />
        <Navigation />
        <div className="ml-44 mt-20">
          
            <div className="flex flex-row mx-75 mt-30 p-4 rounded-b-xl bg-orange-100/50 shadow-xl/30 ">
              <div className="flex flex-col w-1/2 justify-around m-2 p-2">
                <div className="flex flex-row gap-4 items-center m-2 p-2">
                  <div>
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt={userName}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-orange-300 flex items-center justify-center text-white text-2xl font-bold">
                        {userName ? userName.charAt(0).toUpperCase() : "?"}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold text-gray-800">
                      {userName || "No username"}
                    </div>
                    <div> {createdAt} </div>
                  </div>
                </div>
                <div className="mx-2 px-2">
                  <div className="text-xl"> {bio} </div>
                  <div className="flex flex-col items-center"></div>
                  <div className="flex flex-row gap-2">
                    <div>Account is :</div>
                    <div>
                      <Space vertical>
                        <Switch
                          checkedChildren="Private"
                          unCheckedChildren="Public"
                          defaultChecked
                          style={{ backgroundColor: "#ff8804" }}
                        />
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center m-2 p-2 gap-4 border-l-3 border-orange-300/50">
                  <div className="flex flex-row gap-2 m-2 p-2 h-10">
                    <button
                      type="button"
                      className="bg-white rounded-xl m-2 p-2 h-10 w-30 text-lg"
                    >
                      Followers : {followers}{" "}
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-xl m-2 p-2 h-10 w-30 text-lg"
                    >
                      Following : {following}{" "}
                    </button>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      type="button"
                      className="bg-white rounded-xl m-2 p-2 h-10 w-20 text-lg"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

        <ProfilePost userId={userId} />
      </div>
    </div>
    </>
  );
}

export default Profile;
