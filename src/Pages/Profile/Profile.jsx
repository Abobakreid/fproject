import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yub from "yup";
import { Loading, Navbar } from "../../Components";
import PreviewImage from "../../Components/PreviewImage/PreviewImage";
import img1 from "../../assets/back.jpg";
const Profile = () => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const [load, setLaod] = useState(false);
  const [showaddphot, setshowaddphot] = useState(false);
  const lasname = users.name.split("?");
  const [join, setjoin] = useState(false);
  const navigate = useNavigate();

  const handelPhoto = () => {
    setshowaddphot(true);
  };
  const DeleteAccount = () => {
    setjoin(true);
  };

  const handelCancelNo = async () => {
    setjoin(false);
  };

  const handelCancelYes = async () => {
    setjoin(false);
    try {
      setLaod(true);
      await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/${users.id}`,
        {
          method: "DELETE",
        }
      );
      setLaod(false);
      toast.info("Account Deleted", {
        position: "bottom-right",
      });
      navigate("/", { replace: true });
      localStorage.removeItem("userItem");
    } catch (error) {
      setLaod(false);
      toast.dismiss();
      toast.info("error", {
        position: "bottom-right",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: Yub.object({
      image: Yub.mixed()
        .required("required!")
        .test(
          "FILE_SIZE",
          "Too big!",
          (value) => value && value.size < 1024 * 1024
        )
        .test(
          "FILE_TYPE",
          "Invalid",
          (value) =>
            value &&
            ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
        ),
    }),
    onSubmit: async () => {
      setshowaddphot(false);
      const { image } = formik.values;

      try {
        setLaod(true);
        console.log(image, "file2");
        let url = `https://a7gezlyapi.azurewebsites.net/api/Player/Add Profile Picture?id=${users.id}`;
        const formData = new FormData();
        formData.append("file", image);
        const lastData = Object.fromEntries(formData.entries());
        console.log(lastData, "file3");
        const result = await axios.post(url, formData, {
          headers: { "content-Type": "multipart/form-data" },
        });
        console.log(result.data, "ssbakr");
        localStorage.setItem("userItem", JSON.stringify(result.data));
        setLaod(false);
        if (result.data) {
          window.location.reload();
        }
        toast.info("Added", {
          position: "bottom-right",
        });
      } catch (error) {
        setLaod(false);
        toast.dismiss();
        toast.info("email exist", {
          position: "bottom-right",
        });
      }
    },
  });

  return (
    <div className="profile">
      <Navbar
        login={"Register"}
        homeplayr={"homeplayr"}
        stadiums={"stadium"}
        registered={"registered"}
      />
      {load ? <Loading /> : null}
      {join ? (
        <div className="qus">
          <div className="qus_con">
            <p>Are You Sure ?</p>
            <span
              onClick={() => {
                handelCancelYes();
              }}
            >
              Yes
            </span>
            <span
              onClick={() => {
                handelCancelNo();
              }}
            >
              No
            </span>
          </div>
        </div>
      ) : null}
      {showaddphot ? (
        <div className="add_phot">
          <div className="add_phot_file">
            {formik.values.image && <PreviewImage file={formik.values.image} />}
            <form onSubmit={formik.handleSubmit}>
              <input
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  formik.setFieldValue("image", e.target.files[0]);
                }}
              />
              {formik.errors.image && (
                <span style={{ color: "red" }}>{formik.errors.image}</span>
              )}
              <div className="add_phot_save">
                <button type="submit">save</button>
              </div>
            </form>
          </div>
          <span
            className="cancl"
            onClick={() => {
              setshowaddphot(false);
            }}
          >
            cancel
          </span>
        </div>
      ) : null}

      <img className="profile_img" src={img1} alt="" />
      <div className="l_form">
        <div className="container">
          <div className="lo_form">
            <div className="profile_title">
              <img src="#" alt="" />
              <h2 className="text-center">Welcome back , {lasname[0]}</h2>
            </div>
            <div className="user_data">{lasname[0]}</div>
            {lasname[1] === "undefined" ? null : (
              <div className="user_data">{lasname[1]}</div>
            )}
            <div className="user_data">{users.email}</div>
            <div className="user_data">{users.country}</div>
            <div className="user_data">{users.city}</div>
            <div className="user_data">{users.street}</div>
            <div className="add_ph user_data">
              <span
                onClick={() => {
                  handelPhoto();
                }}
              >
                Add Photo
              </span>
            </div>
            {users.playerPosition == 3 ? (
              <div className="user_data">GoalKeeper</div>
            ) : null}
            {users.playerPosition == 0 ? (
              <div className="user_data">Defender</div>
            ) : null}
            {users.playerPosition == 2 ? (
              <div className="user_data">Center</div>
            ) : null}
            {users.playerPosition == -1 ? (
              <div className="user_data">Striker</div>
            ) : null}
            <div className="add_phs user_data">
              <span
                onClick={() => {
                  DeleteAccount();
                }}
              >
                Delete Account
              </span>
            </div>
            <div className="user_data">{users.phoneNumber}</div>
            <div className="profile_link">
              <NavLink to={"/playerhome"}>Back</NavLink>
              <div className="profile_change_pass">
                <NavLink to={"/playeredit"}>Edit</NavLink>
                <NavLink to={"/changeplayerpass"}>Change Password</NavLink>
              </div>
            </div>
            {/* <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="E-mail" />
            <input type="text" placeholder="country" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Street" />
            <input type="text" placeholder="Position" />
            <input type="text" placeholder="Phone Number" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
