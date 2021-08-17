import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Keranjang from './Keranjang';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  onHover = () => {
    this.setState({
      popoverOpen: true,
    })
  }

  onHoverLeave = () => {
    this.setState({
      popoverOpen: false,
    })
  }

  render() {
    return (
      <div>
        <Button id="Popover1" type="button" onMouseEnter={this.onHover}
          onMouseLeave={this.onHoverLeave}>
          Launch Popover
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
          <PopoverHeader>Keranjang</PopoverHeader>
          <PopoverBody><Keranjang />{/* Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. */}</PopoverBody>
        </Popover>
      </div>
    );
  }
}





// Percobaan ke 2

// import React, { useState } from "react";
// import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

// const PopoverItem = props => {
//   const { id, item } = props;
//   const [popoverOpen, setPopoverOpen] = useState(false);

//   const toggle = () => setPopoverOpen(!popoverOpen);

//   return (
//     <span>
//       <Button
//         className="mr-1"
//         color="secondary"
//         id={"Popover-" + id}
//         type="button"
//       >
//         {item.text}
//       </Button>
//       <Popover
//         placement={item.placement}
//         isOpen={popoverOpen}
//         target={"Popover-" + id}
//         toggle={toggle}
//       >
//         <PopoverHeader>Popover Title</PopoverHeader>
//         <PopoverBody>
//           Sed posuere consectetur est at lobortis. Aenean eu leo quam.
//           Pellentesque ornare sem lacinia quam venenatis vestibulum.
//         </PopoverBody>
//       </Popover>
//     </span>
//   );
// };

// const PopoverExampleMulti = props => {
//   return (
//     <>
//       {[
//         {
//           placement: "top",
//           text: "Top"
//         },
//         {
//           placement: "bottom",
//           text: "Bottom"
//         },
//         {
//           placement: "left",
//           text: "Left"
//         },
//         {
//           placement: "right",
//           text: "Right"
//         }
//       ].map((popover, i) => {
//         return <PopoverItem key={i} item={popover} id={i} />;
//       })}
//     </>
//   );
// };

// export default PopoverExampleMulti;

// Percobaan ke 3


// import React from "react";
// import { Overlay, Button, Popover } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default class IKi extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       show: false,
//       target: null,
//     };
//     this.myRef = React.createRef(null);
//   }

//   handleClick = async (event) => {
//     await this.setState({ show: !this.state.show });
//     await this.setState({ target: event.target });
//   };

//   render() {
//     // console.info(this.props);

//     // const { show, target } = this.stat e;
//     return (
//       <div ref={this.myRef}>
//         <Button onClick={this.handleClick}>Holy guacamole!</Button>

//         <Overlay
//           show={this.state.show}
//           target={this.state.target}
//           placement="bottom"
//           container={this.myRef.current}
//           containerPadding={20}
//         >
//           <Popover id="popover-contained">
//             <Popover.Header as="h3">Popover bottom</Popover.Header>
//             <Popover.Body>
//               <strong>Holy guacamole!</strong> Check this info.
//             </Popover.Body>
//           </Popover>
//         </Overlay>
//       </div>
//     );
//   }
// }
