import React from "react";
import Images from "./present_components/images";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ind: 0,
      id: "upload-photo",
      imageArray: [],
      loader: false,
      no_format: false
    };
  }

  handleChange(e) {
    this.readURI(e);
    if (this.props.onChange !== undefined) {
      this.props.onChange(e);
    }
  }

  readURI(e) {
    var no_format = false;
    this.setState({ no_format: false });
    const image_concat = this.state.imageArray;
    console.log("image_concat", image_concat);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      Promise.all(
        files.map((file) => {
          if (
            file.type.toLowerCase().includes("image/jpeg") ||
            file.type.toLowerCase().includes("image/jpg") ||
            file.type.toLowerCase().includes("image/png") ||
            file.type.toLowerCase().includes("image/heic")
          ) {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.addEventListener("load", (ev) => {
                resolve(ev.target.result);
              });
              reader.addEventListener("error", reject);
              reader.readAsDataURL(file);
            });
          } else {
            this.setState({ no_format: true });
            this.setState({ imageArray: [] });
            no_format = true;
            localStorage.setItem("imageArray", "");
            return false;
          }
        })
      ).then(
        (images) => {
          if (no_format) {
            this.setState({ imageArray: [] });
          } else {
            this.setState({ imageArray: images.concat(image_concat) });
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  render() {
    return (
      <div className={"flex-container  "}>
        <div className={"flex-container__top_info"}>
          <div className={"flex-container_header_message  col-12 "}></div>

          <div className={"margin_content"}>
            <div id="theRibbon">
              <div className={"upload-btn-wrapper"}>
                <button className={" btn-wrapper"}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={"mr-5"}
                  >
                    <path
                      d="M18 2V14H6V2H18ZM18 0H6C4.9 0 4 0.9 4 2V14C4 15.1 4.9 16 6 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM9.5 9.67L11.19 11.93L13.67 8.83L17 13H7L9.5 9.67ZM0 4V18C0 19.1 0.9 20 2 20H16V18H2V4H0Z"
                      fill="white"
                    />
                  </svg>
                  Загрузить изображение
                </button>
                <input
                  id={this.state.id}
                  type="file"
                  name=""
                  accept="image/jpeg,image/jpg,image/png"
                  title="Add photos"
                  onChange={this.handleChange.bind(this)}
                  multiple
                />
                <label htmlFor={this.state.id}>
                  {this.state.imageArray.length == 0 ? (
                    <small> {this.state.imageArray.length} изображений</small>
                  ) : (
                    [
                      this.state.imageArray.length == 1 ? (
                        <small>
                          {" "}
                          {this.state.imageArray.length} изображение
                        </small>
                      ) : (
                        <small>
                          {" "}
                          {this.state.imageArray.length} изображения
                        </small>
                      )
                    ]
                  )}
                </label>
              </div>
              {this.state.no_format == false ? (
                <Images
                  for_map={this.state.imageArray}
                  loader={this.state.loader}
                />
              ) : (
                <p className={"message_invalid"}>
                  Данный формат не поддерживается
                </p>
              )}
            </div>
          </div>
        </div>
        <div className={"bottom_info"}></div>
      </div>
    );
  }
}

export default Image;
