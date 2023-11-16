import Image from "next/image";
import React, { useEffect, useState } from "react";
import MiniLoader from "./loader/MiniLoader";
import { useDispatch, useSelector } from "react-redux";
import useFollow from "@/hooks/useFollow";
import { setIsFollowing, setIsFollowingId } from "@/redux/slices/profile";
import { Oval } from "react-loader-spinner";
type UserProp = {
  name: string;
  username: string;
  _id: string;
  image: string;
  bio: string;
  tags: string[];
};
const SuggestedPeople = () => {
  const [randomUsers, setRandomUsers] = useState<UserProp[] | []>([]);
  // const [isFollowingId, setIsFollowingId] = useState("");
  const {
    isLoggedInUser,
    userDetails,
    sessionUserData,
    isFollowingId,
    follow,
  } = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState({ loading: false, userId: "" });

  const { toggleFollow } = useFollow();
  const getRandomUsers = async () => {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      if (res.ok) {
        setRandomUsers(data.users);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async (userId: string) => {
    setIsLoading((prev) => {
      return { loading: true, userId };
    });

    try {
      const res = await toggleFollow({
        followerId: sessionUserData.id,
        followingId: userId,
      });
      console.log(res);

      if (res.statusText === "Created") {
        dispatch(setIsFollowingId(userId));
      } else if (res.statusText === "OK") {
        dispatch(setIsFollowingId(""));
      }
    } catch (error) {
      console.log(error);
      setIsFollowingId("");
    } finally {
      setIsLoading((prev) => {
        return { loading: false, userId: "" };
      });
    }
  };
  useEffect(() => {
    getRandomUsers();
  }, []);
  return (
    <section className='hidden lg:block box_shadow2  w-4/5 mx-auto my-10 py-5 bg-white'>
      <h3 className='font-bold  capitalize text-center my-2 border-b-[1px] border-link-blue text-  pb-3'>
        People you may follow
      </h3>
      {randomUsers?.map((user) => {
        return (
          <div
            key={user?._id}
            className='flex justify-between px-3 items-center gap-3 py-3 hover:bg-gray-200'
          >
            <Image
              src={user?.image || "/hero1.jpg"}
              alt='profile'
              width={40}
              height={40}
              className=' aspect-square object-cover rounded-full'
            />
            <div className='w-full'>
              <h4 className='text-sm   font-semibold '>{user?.name}</h4>
              <p className='text-link-blue  text-xs font-sans lowercase'>
                {user?.tags.map((item, index) => (
                  <span key={index}>#{item} </span>
                ))}
              </p>
            </div>
            {isLoading.loading && isLoading.userId === user._id ? (
              <Oval
                height={20}
                width={20}
                color='#236099'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
                ariaLabel='oval-loading'
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              <button
                disabled={isLoading.loading}
                onClick={() => handleFollow(user?._id)}
                className='text-xs text-end underline  text-link-blue'
              >
                {" "}
                {isFollowingId === user._id ? <>Unfollow</> : <>Follow </>}
              </button>
            )}{" "}
          </div>
        );
      })}
    </section>
  );
};

export default SuggestedPeople;
