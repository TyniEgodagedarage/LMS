import { Card } from "antd";
import React, { useEffect, useRef } from "react";
import { Empty } from "antd";
import { Helmet } from "react-helmet";
import axios from "axios";

import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Tabs } from "antd";
import { Skeleton } from "antd";
import "./Home.css";
import CourseCard from "../../components/CourseCard/CourseCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  dispatchGetUser,
  fetchUser,
} from "../../redux/actions/authAction";
import {
  Listcoursesbypobularity,
  ListcoursesbyTopic,
} from "../../redux/actions/courseActions";
import Error from "../../components/utils/Error";

const Home = () => {
  const dispatch = useDispatch();
  const ListCoursesReducer = useSelector((state) => state.ListCoursesReducer);
  const { loading, courses, error } = ListCoursesReducer;
  const ListCoursesbyPobularityReducer = useSelector(
    (state) => state.ListCoursesbyPobularityReducer
  );
  const {
    loading: loadingpobular,
    courses: coursespobular,
    error: errorpobular,
  } = ListCoursesbyPobularityReducer;
  const menuref = useRef(null);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const pobularref = useRef(null);
  var settings = {
    dots: false,
    infinite: true,
    // speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  const executeScroll = () => menuref.current.scrollIntoView();

  const { TabPane } = Tabs;
  useEffect(() => {
    const getToken = async () => {
      // make post request : hey db get me some data and return it to me
      const res = await axios.post("/user/refresh_token", null);
      dispatch({
        type: "GET_TOKEN",
        payload: res.data.access_token,
      });
    };
    getToken();
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        //Get user infor
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
    dispatch(ListcoursesbyTopic("Development"));
    dispatch(Listcoursesbypobularity());
  }, [auth.isLogged, token, dispatch]);
  const changetopic = (key) => {
    switch (key) {
      case "1":
        dispatch(ListcoursesbyTopic("Development"));
        break;
      case "2":
        dispatch(ListcoursesbyTopic("marketing"));
        console.log("case 2");
        break;
      case "3":
        dispatch(ListcoursesbyTopic("Self-dev"));
        console.log("case 3");
        break;
      case "4":
        dispatch(ListcoursesbyTopic("photography"));
        console.log("case 4");
        break;
      case "5":
        dispatch(ListcoursesbyTopic("music"));
        console.log("case 5");
        break;
      case "6":
        dispatch(ListcoursesbyTopic("design"));
        console.log("case 6");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Helmet>
        <title>EZ Learn | Home</title>
      </Helmet>
      <div>
      <img
          className="Home_image"
          alt=""
          src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ymx1ZSUyMGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&w=1000&q=80
          "
        />
        <br></br><br></br>
        <div className="Categorycards">
          <Card>
            <h1>Need to enjoy?</h1>
            <hr />
         <h1> <a href ="https://www.gamestolearnenglish.com/">Let's play </a></h1>
           
          </Card>
          <Card>
            <h1>Text to speech</h1>
            <hr />
            <h1> <a href ="https://soundoftext.com/">Let's Go</a></h1>
           
          </Card>
          <Card>
            <h1> pronunciatian</h1>
            <hr />
            <h1><a href ="https://little-brother.github.io/english-speech/">Let's do</a></h1>
           
          </Card>
          <Card>
            <h1> Listen to score</h1>
            <hr />
            <h1><a href ="https://little-brother.github.io/english-words/">Let's move</a> </h1>
           
          </Card>
          <Card>
            <h1>Collect vocab</h1>
            <hr />
            <h1><a href ="https://little-brother.github.io/english-cards/">Let's try</a> </h1>
           
          </Card>
          
        </div>
       
      </div>
      <section className="Menu1" id="Menu1" ref={menuref}>
        <h2>For Newbies :</h2>
        <h3>We Recommend this for you to start.</h3>

        <Tabs defaultActiveKey="1" onTabClick={changetopic}>
          <TabPane tab="Reading" key="1">
            <div className="Tab_Content">
              <h2>Become a hero in Reading</h2>

              <div id="paragraphbtn">
                <p>
                Here you can find activities to practise your reading skills. Reading will help you to improve your understanding of the language and build your vocabulary.
                The self-study lessons in this section are written and organised according to the levels of the Common European Framework of Reference for languages (CEFR). There are different types of texts and interactive exercises that practise the reading skills you need to do well in your studies, to get ahead at work and to communicate in English in your free time.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Development"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                  
                </Link>
                {/* <a href="Home/q1.html" target="_blank" rel="noreferrer">
          <button>quiz</button>
        </a> */}
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Speaking" key="2">
            <div className="Tab_Content">
              <h2>Become a fluent speaker</h2>

              <div id="paragraphbtn">
                <p>
                Speak and Improve is a research project from the University of Cambridge. By using it you are helping us improve technology that will help English learners around the world.
                alk to our speech robot, Sandi, who will ask you some questions.
Afterwards, Sandi will give you a grade for your speaking.
Were some questions difficult for you? Try them again to improve your score.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Marketing"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Listening" key="3">
            <div className="Tab_Content">
              <h2>Improve yor writings</h2>
              <div id="paragraphbtn">
                <p>
                  Personal development is a lifelong process. It is a way for
                  people to assess their skills and qualities, consider their
                  aims in life and set goals in order to realise and maximise
                  their potential.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Self-Dev"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Grammer" key="4">
            <div className="Tab_Content">
              <h2>Become a good listenner</h2>
              <div id="paragraphbtn">
                <p>
                  Learning about light, exposure, color, tone, composition and
                  timing will help you produce more creative, more interesting,
                  more noticeable photographs. ... Learning to appreciate
                  different types of light and when some light is better for
                  making photos than others, will help you create more
                  outstanding photographs.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Photography"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Quiz" key="5">
            <div className="Tab_Content">
              <h2>Become fluent in Grammer</h2>

              <div id="paragraphbtn">
                <p>
                In this section you can grab important grammer areas in English Language.
                   Starts with beginners level and try to improve yours grammer skills.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Music"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Writing" key="6">
            <div className="Tab_Content">
              <h2>Let's try some quizzes</h2>
              <div id="paragraphbtn">
                <p>
                Now you are in quiz section. In this section you can do some quiz and evaluate your english knowledge.
                </p>
                <Link
                  style={{ textDecoration: "none !important" }}
                  to="/coursesfilter/Design"
                >
                  <button className="Btn" id="ReadMorebtn">
                    Discover More
                  </button>
                </Link>
              </div>
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </section>
{ <section className="Courses_Popular" ref={pobularref}>
        <h2>Popular Courses </h2>
        <div className="coursecards">
          {loadingpobular ? (
            <Skeleton />
          ) : errorpobular ? (
            <Error error={errorpobular} />
          ) : coursespobular.length === 0 ? (
            <Empty />
          ) : (
            <Slider {...settings}>
              {coursespobular.map((course, index) => (
                <>
                  <CourseCard
                    key={course._id}
                    data-index={index}
                    course={course}
                  />
                </>
              ))}
            </Slider>
          )}
        </div>
      </section> }
      <section className="Categorys_Popular">
        <h2>Popular Categories</h2>
        <div className="Categorycards">
          {/* <CategoryCard
            title="Development"
            image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          /> */}
          <CategoryCard
            
            title= "Reading"
            image="https://cdn.pixabay.com/photo/2017/09/21/13/32/girl-2771936_960_720.jpg"
 
            
          />
          <CategoryCard
            title="Speaking"
            image="https://cdn.pixabay.com/photo/2018/09/24/17/12/board-3700375_960_720.jpg"
            
          />
          <CategoryCard
            title="Writing"
            image="https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_960_720.jpg"
          />
          <CategoryCard
            title="Listening"
            image="https://cdn.pixabay.com/photo/2014/07/31/23/38/headphones-407190_960_720.jpg"
          />
          <CategoryCard
            title="Grammer"
            image="https://cdn.pixabay.com/photo/2015/04/03/18/56/font-705667_960_720.jpg"
          />
          <CategoryCard
            title="Quiz"
            image="https://cdn.pixabay.com/photo/2020/01/06/19/26/crossword-4746035_960_720.jpg"
          />
          {/* <CategoryCard
            title="Education"
            image="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          />
        </div>
      </section>
      <section className="Become_Teacher">
        <div className="background">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            alt="Teacher"
          /> */}
          {/* <div className="paragraph">
            <h2>Become a Teacher with us</h2>
            <p>Do you have the skills and you want to share it with profit?</p>
            <button className="Btn" id="Joinusbtn">
              Join Us
            </button>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
