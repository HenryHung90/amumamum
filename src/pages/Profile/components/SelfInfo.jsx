import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import bcryptjs from "bcryptjs";
import axios from "axios";

const SelfInfo = ({ Logout, UserToken }) => {
  /////////////////身份核對///////////////////
  const [UserData, setUserData] = useState("");
  const Refresh = useNavigate();

  //取得UserToken
  useEffect(() => {
    let GetSid = sessionStorage.getItem("Sid");
    if (UserToken === null) {
      axios({
        method: "POST",
        data: {
          _id: GetSid,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_USERINFO,
      }).then((response) => {
        setUserData(response.data);
      });
    } else {
      setUserData(UserToken);
    }
  }, [UserToken]);

  //////////////修改密碼/////////////////////
  const ChangePassword = () => {
    document.getElementById("PasswordChangeDiv").style.visibility = "visible";
    document.getElementById("BlockDiv").style.visibility = "visible";
  };
  //密碼修改送出
  const submitPassword = () => {
    const getOldPassword = document.getElementById("OldPassword").value;
    const getNewPasswordFirst =
      document.getElementById("NewPassword_First").value;
    const getNewPasswordCheck =
      document.getElementById("NewPassword_Check").value;
    const GetSid = sessionStorage.getItem("Sid");
    if (
      getOldPassword === "" ||
      getNewPasswordFirst === "" ||
      getNewPasswordCheck === ""
    ) {
      alert("未輸入完成!");
    }
    if (getNewPasswordCheck === getNewPasswordFirst) {
      bcryptjs.hash(getNewPasswordFirst, 10).then((hashed) => {
        axios({
          method: "POST",
          data: {
            _id: GetSid,
            OldPassword: getOldPassword,
            NewPassword: hashed,
          },
          withCredentials: true,
          url: process.env.REACT_APP_AXIOS_CHANGEPASSWORD,
        }).then((response) => {
          if (response.data === "success") {
            alert("修改完成");
            document.getElementById("BlockDiv").style.visibility = "hidden";
            document.getElementById("PasswordChangeDiv").style.visibility =
              "hidden";
          } else {
            alert("修改失敗，舊密碼不一致");
          }
        });
      });
    } else {
      alert("新密碼不一致");
    }
  };
  //取消變更
  const cancelPassword = () => {
    document.getElementById("BlockDiv").style.visibility = "hidden";
    document.getElementById("PasswordChangeDiv").style.visibility = "hidden";
  };
  ////////////////////////////////////////////////////////
  ///////////////////////變更Email////////////////////////
  const ChangeEmail = () => {
    document.getElementById("BlockDiv").style.visibility = "visible";
    document.getElementById("EmailChangeDiv").style.visibility = "visible";
  };
  const submitEmail = () => {
    const getNewEmail = document.getElementById("NewEmail");
    const GetSid = sessionStorage.getItem("Sid");
    const emailRule =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    // ^\w+：@ 之前必須以一個以上的文字&數字開頭，例如 abc
    // ((-\w+)：@ 之前可以出現 1 個以上的文字、數字或「-」的組合，例如 -abc-
    // (\.\w+))：@ 之前可以出現 1 個以上的文字、數字或「.」的組合，例如 .abc.
    // ((-\w+)|(\.\w+))*：以上兩個規則以 or 的關係出現，並且出現 0 次以上 (所以不能 –. 同時出現)
    // @：中間一定要出現一個 @
    // [A-Za-z0-9]+：@ 之後出現 1 個以上的大小寫英文及數字的組合
    // (\.|-)：@ 之後只能出現「.」或是「-」，但這兩個字元不能連續時出現
    // ((\.|-)[A-Za-z0-9]+)*：@ 之後出現 0 個以上的「.」或是「-」配上大小寫英文及數字的組合
    // \.[A-Za-z]+$/：@ 之後出現 1 個以上的「.」配上大小寫英文及數字的組合，結尾需為大小寫英文
    if (getNewEmail.value.search(emailRule) !== -1) {
      axios({
        method: "POST",
        data: {
          _id: GetSid,
          Email: getNewEmail.value,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_CHANGEEMAIL,
      }).then((response) => {
        if (response.data === "success") {
          alert("修改完成");
          Refresh("/Profile");
        }
      });
    } else {
      alert("電子郵件格式不正確");
    }
  };
  const cancelEmail = () => {
    document.getElementById("BlockDiv").style.visibility = "hidden";
    document.getElementById("EmailChangeDiv").style.visibility = "hidden";
  };
  //////////////////Btn goStudy////////////////
  const goStudy = () => {
    document.getElementById("BlockDiv").style.visibility = "visible";
    document.getElementById("ChooseClassDiv").style.visibility = "visible";
    document.getElementById("Class_A1").style.visibility = "visible";
    document.getElementById("Class_A2").style.visibility = "visible";
    document.getElementById("Class_A3").style.visibility = "visible";
  };
  const GoStudy_A1 = () => {
    Refresh("/A1");
  };
  const GoStudy_A2 = () => {
    Refresh("/A2");
  };
  const GoStudy_A3 = () => {
    Refresh("/A3");
  };
  const GoStudy_Admin = () => {
    Refresh("/Admin");
  };
  const cancelStudy = () => {
    document.getElementById("BlockDiv").style.visibility = "hidden";
    document.getElementById("ChooseClassDiv").style.visibility = "hidden";
    document.getElementById("Class_A1").style.visibility = "hidden";
    document.getElementById("Class_A2").style.visibility = "hidden";
    document.getElementById("Class_A3").style.visibility = "hidden";
  };

  const goCheck = () => {
    Refresh("/AdminGrade");
  };
  const goAboutUs = () => {
    Refresh("/Aboutus");
  };
  return (
    <>
      <div className="PasswordChange" id="PasswordChangeDiv">
        <h3 className="PasswordChange_Title">修改密碼</h3>
        <div className="PasswordLine">
          <h5 className="PasswordLine_Title">輸入舊密碼</h5>
          <TextField id="OldPassword" label="舊密碼" variant="standard" />
        </div>
        <div className="PasswordLine">
          <h5 className="PasswordLine_Title">輸入新密碼</h5>
          <TextField id="NewPassword_First" label="新密碼" variant="standard" />
        </div>
        <div className="PasswordLine">
          <h5 className="PasswordLine_Title">確認新密碼</h5>
          <TextField
            id="NewPassword_Check"
            label="再次輸入"
            variant="standard"
          />
        </div>
        <div className="PasswordBtn">
          <Button
            id="submitPassword"
            variant="contained"
            color="success"
            onClick={submitPassword}
          >
            確認修改
          </Button>
          <Button
            id="cancel"
            variant="outlined"
            color="error"
            onClick={cancelPassword}
          >
            取消
          </Button>
        </div>
      </div>

      <div className="EmailChange" id="EmailChangeDiv">
        <h3 className="EmailChange_Title">修改電子郵件</h3>
        <div className="EmailLine">
          <h5 className="EmailLine_Title">輸入新Email</h5>
          <TextField id="NewEmail" label="新Email" variant="standard" />
        </div>
        <div className="EmailBtn">
          <Button
            id="submitEmail"
            variant="contained"
            color="success"
            onClick={submitEmail}
          >
            確認修改
          </Button>
          <Button
            id="cancelEmail"
            variant="outlined"
            color="error"
            onClick={cancelEmail}
          >
            取消
          </Button>
        </div>
      </div>

      <div className="ChooseClass" id="ChooseClassDiv">
        <h3 className="ChooseClass_Title">選擇進入課程</h3>
        <div className="ChooseClassLine">
          <div className="ChooseClassBox">
            {UserData.Access === "1" && (
              <>
                <div className="ChooseClassBox_DIV" id="Class_A2">
                  尚未開放
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A1"
                  onClick={GoStudy_A1}
                >
                  傳統式學習
                </div>
                <div className="ChooseClassBox_DIV" id="Class_A3">
                  尚未開放
                </div>
              </>
            )}
            {UserData.Access === "2" && (
              <>
                <div className="ChooseClassBox_DIV" id="Class_A1">
                  尚未開放
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A2"
                  onClick={GoStudy_A2}
                >
                  互動式學習
                </div>
                <div className="ChooseClassBox_DIV" id="Class_A3">
                  尚未開放
                </div>
              </>
            )}
            {UserData.Access === "3" && (
              <>
                <div className="ChooseClassBox_DIV" id="Class_A1">
                  尚未開放
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A3"
                  onClick={GoStudy_A3}
                >
                  引導式學習
                </div>
                <div className="ChooseClassBox_DIV" id="Class_A2">
                  尚未開放
                </div>
              </>
            )}
            {UserData.Access === "12" && (
              <>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A1"
                  onClick={GoStudy_A1}
                >
                  傳統式學習
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A2"
                  onClick={GoStudy_A2}
                >
                  互動式學習
                </div>
              </>
            )}
            {UserData.Access === "13" && (
              <>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A1"
                  onClick={GoStudy_A1}
                >
                  傳統式學習
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A3"
                  onClick={GoStudy_A3}
                >
                  引導式學習
                </div>
              </>
            )}
            {UserData.Access === "23" && (
              <>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A2"
                  onClick={GoStudy_A2}
                >
                  互動式學習
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A3"
                  onClick={GoStudy_A3}
                >
                  引導式學習
                </div>
              </>
            )}
            {UserData.Access === "123" && (
              <>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A1"
                  onClick={GoStudy_A1}
                >
                  傳統式學習
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A2"
                  onClick={GoStudy_A2}
                >
                  互動式學習
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A3"
                  onClick={GoStudy_A3}
                >
                  引導式學習
                </div>
              </>
            )}
            {UserData.Access === "Admin" && (
              <>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A1"
                  onClick={GoStudy_A1}
                >
                  傳統式學習
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A2"
                  onClick={GoStudy_A2}
                >
                  互動式學習
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A3"
                  onClick={GoStudy_A3}
                >
                  引導式學習
                </div>
                <div
                  className="ChooseClassBox_DIV"
                  id="Class_A3"
                  onClick={GoStudy_Admin}
                >
                  管理員介面
                </div>
              </>
            )}
          </div>
          <Button
            id="cancelStudy"
            variant="outlined"
            color="error"
            onClick={cancelStudy}
          >
            取消
          </Button>
        </div>
      </div>

      <div className="Block" id="BlockDiv"></div>
      <h1 className="ProfileTitle" style={{ userSelect: "none" }}>
        Data Structure Virtualization
      </h1>
      <img
        className="developer"
        src="./Img/developer.gif"
        onClick={goAboutUs}
      />
      <div className="SelfProfile">
        <div className="SelfProfile_Stand">
          <h3 className="SelfProfile_Title">
            {UserData.Name} {UserData.StudentId}
          </h3>
        </div>
        <div className="Classroom" style={{ userSelect: "none" }}>
          <div className="GoStudy" onClick={goStudy}>
            進入課程
          </div>
          <div
            className="GoCheck"
            style={{
              display: UserData.Access === "Admin" ? "flex" : "none",
              justifyContent: "center",
            }}
            onClick={goCheck}
          >
            查看成績
          </div>
        </div>
        <div className="SelfProfile_Self">
          <Button
            variant="contained"
            style={{
              marginLeft: "1em",
              marginTop: "1em",
              height: "1.5em",
              fontSize: "1em",
            }}
            onClick={ChangePassword}
          >
            修改密碼
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: "1em",
              marginTop: "1em",
              height: "1.5em",
              fontSize: "1em",
            }}
            onClick={ChangeEmail}
          >
            修改電子郵件
          </Button>
          <Button
            variant="contained"
            type="submit"
            style={{
              marginLeft: "1em",
              marginTop: "1em",
              height: "1.5em",
              fontSize: "1em",
              width: "10em",
              backgroundColor: "black",
            }}
            onClick={() => {
              Logout();
              Refresh("/");
            }}
          >
            登出
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelfInfo;
