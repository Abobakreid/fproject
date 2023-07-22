import axios from "axios";
import React, { useState } from "react";
const Reserveo = () => {
  const [file, setfile] = useState();

  let handelfun = (e) => {
    console.log(e.target.files[0], "file1");
    setfile(e.target.files[0]);
  };

  let handelsub = async (e) => {
    e.preventDefault();
    try {
      console.log(file, "file2");
      let url = `https://a7gezlyapi.azurewebsites.net/api/Player/Add Profile Picture?id=6`;
      const formData = new FormData();
      formData.append("file", file);
      const lastData = Object.fromEntries(formData.entries());
      console.log(lastData, "file3");
      const result = await axios.post(url, formData, {
        headers: { "content-Type": "multipart/form-data" },
      });
      console.log(result, "result");
      
    } catch (error) {
      console.log("s");
    }
  };

  return (
    <div className="reserveb">
      <form
        onSubmit={(e) => {
          handelsub(e);
        }}
      >
        <input
          className="inp"
          type="file"
          onChange={(event) => {
            handelfun(event);
          }}
        />
        <button type="submit" className="btn">
          submit
        </button>
      </form>
    </div>
  );
};

export default Reserveo;

{
  /* <form onSubmit={handleSubmit}>
              <div className="select_box">
                <label>Gk_handling</label>
                <select
                  className="s_input"
                  onChange={handleChange}
                  value={values.Gk_handling}
                  onBlur={handleBlur}
                  id="Gk_handling"
                >
                  <option value="">Select</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                </select>
                {errors.Gk_handling && touched.Gk_handling && (
                  <span className="error">{errors.Gk_handling}</span>
                )}
              </div>
              <div className="select_box">
                <label>Gk_kicking</label>
                <select
                  className="s_input"
                  onChange={handleChange}
                  value={values.Gk_kicking}
                  onBlur={handleBlur}
                  id="Gk_kicking"
                >
                  <option value="">Select</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                </select>
                {errors.Gk_kicking && touched.Gk_kicking && (
                  <span className="error">{errors.Gk_kicking}</span>
                )}
              </div>
              <div className="select_box">
                <label>Gk_reflexes</label>
                <select
                  className="s_input"
                  onChange={handleChange}
                  value={values.Gk_reflexes}
                  onBlur={handleBlur}
                  id="Gk_reflexes"
                >
                  <option value="">Select</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                </select>
                {errors.Gk_reflexes && touched.Gk_reflexes && (
                  <span className="error">{errors.Gk_reflexes}</span>
                )}
              </div>
              <div className="select_box">
                <label>Gk_speed</label>
                <select
                  className="s_input"
                  onChange={handleChange}
                  value={values.Gk_speed}
                  onBlur={handleBlur}
                  id="Gk_speed"
                >
                  <option value="">Select</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                </select>
                {errors.Gk_speed && touched.Gk_speed && (
                  <span className="error">{errors.Gk_speed}</span>
                )}
              </div>
              <div className="select_box">
                <label>Gk_diving</label>
                <select
                  className="s_input"
                  onChange={handleChange}
                  value={values.Gk_diving}
                  onBlur={handleBlur}
                  id="Gk_diving"
                >
                  <option value="">Select</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                </select>
                {errors.Gk_diving && touched.Gk_diving && (
                  <span className="error">{errors.Gk_diving}</span>
                )}
              </div>
              <div className="select_box">
                <label>Gk_positioning</label>
                <select
                  className="s_input"
                  onChange={handleChange}
                  value={values.Gk_positioning}
                  onBlur={handleBlur}
                  id="Gk_positioning"
                >
                  <option value="">Select</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                </select>
                {errors.Gk_positioning && touched.Gk_positioning && (
                  <span className="error">{errors.Gk_positioning}</span>
                )}
              </div>
              <button className="r_btn" type="submit">
                Register
              </button>
            </form> */
}
