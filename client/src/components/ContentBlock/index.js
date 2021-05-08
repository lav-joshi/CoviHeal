import LeftContentBlock from "./LeftContentBlock";
import RightContentBlock from "./RightContentBlock";

const ContentBlock = (props) => {
  if (props.type === "left") return (<LeftContentBlock {...props} />);
  else if (props.type === "right") return (<RightContentBlock {...props} />);
  return null;
};

export default ContentBlock;
