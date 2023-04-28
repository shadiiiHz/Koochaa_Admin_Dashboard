
import img from "../../images/Dashboard1.png";
import styled from "styled-components";
const HomeStyle = styled.div`
  flex: 9;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HomeWidgets = styled.div`
  display: flex;
  margin: 50px;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  height: 70%;
  width: 60%;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 200px;
`;
export default function Home() {
  return (
    <HomeStyle>
      {/* <FeaturedInfo /> */}
      {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User"/> */}
      <HomeWidgets>
        {/* <WidgetSm/> */}
        {/* <WidgetLg/> */}
        
      </HomeWidgets>
    </HomeStyle>
  );
}
