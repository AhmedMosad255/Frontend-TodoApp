import FirstComponentent from './FirstComponentent'
import SecondComponent from './SecondComponent'
import ThirdComponent from './ThirdComponent'
import FourthComponent from './FourthComponent'
import LearningJavaScript from './LearningJavaScript';


export default function LearningComponent() {
    return (
      <div className="App">
        My Todo Application
        <FirstComponentent></FirstComponentent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
        <FourthComponent></FourthComponent>
        <LearningJavaScript/>
      </div>
    );
  }