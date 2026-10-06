import React, { Component } from "react"; 
import "./App.css";
import ContainerDetail from "./ContainerDetail";
import AssignmentList from "./AssignmentList";

class App extends Component{ /*JavaScript 클래스 : React 컴포넌트를 만드는 문법*/
  /* React의 컴포넌트 기능을 물려받아 App 이라는 화면을 만듦 */
  state = {
    selectedOrderId: "", 
    //seledtedOrderId: 사용자가 선택한 오더번호 
    selectedSlotId:"",
    // selectedSlotId: 현재 선택한 야드 공간 번호를 저장하는 값   

    // orders : 오더 목록 , 각 오더의 번호·상품명·수량
    orders :[
      {id:"ORD-001",product:"자동차 부품",quantity:20},
      {id:"ORD-002",product:"전자제품",quantity:15},
      {id:"ORD-003",product:"생활용품",quantity:30},
    ],

    // slots : 야드 공간 목록 , 공간 번호와 배정된 오더 번호 저장 
    // orderId: null 은 빈공간으로 야드 공간 "A-01"은 오더 "ORD-001" 이미 들어있으므로 배정된 공간 
    slots: [
      {id:"A-01",orderId:"ORD-001"},
      {id:"A-02",orderId:null},
      {id:"A-03",orderId:null},
      {id:"B-01",orderId:null},
      {id:"B-02",orderId:null},
      {id:"B-03",orderId:null},
    ]

  };
  
  // 공간 클릭하면 상태에 맞는 안내 
  handleSlotClick = (slot) => { 
    const {selectedOrderId} = this.state;

    if (slot.orderId){
      const confirmed = window.confirm(
        "이미 배정된 공간입니다. 상세정보를 보시겠습니까?"
      )

      if(confirmed){
        this.setState({
          currentPage: "detail",
          selectedSlotId : slot.id,
        });
      }

      return;
    }
    
    if(!selectedOrderId){
      window.alert("먼저 오더를 선택해주세요");
      return;
    }

    const confirmed= window.confirm(
      `${slot.id}에 ${selectedOrderId}를 배정할까요?`
    );

    if(!confirmed){
      return;
    }

    this.setState((prevState) => ({
      slots: prevState.slots.map((item)=>
      item.id === slot.id 
      // 현재 확인하는 공간이 클릭한 공간인지 확인 
        ? {...item, orderId:selectedOrderId}
        // ...item: 기존 공간 정보를 복사하고 orderId를 선택한 오더로 바꿈 
       :item
        // 아니면 기존 공간을 그대로 사용 
      ),
      selectedOrderId : "",
      // 배정 후 오더 선택 초기화 
    }));
  };

  render(){
  /* 이 컴포넌트가 화면에 무엇을 보여줄지 정하는 메서드 */  
    const {
      orders,
      slots,
      selectedOrderId,
      currentPage,
      selectedSlotId,
    } = this.state;
    // state 안의 orders 를 꺼내 orders 라는 이름으로 사용 

    if(currentPage === "detail"){
      const selectedSlot = slots.find(
        // find() : 조건에 맞는 항목 하나 찾기. 공간 번호로 공간을 찾고, 그 공간의 orderId로 오더를 찾음 
        (slot) => slot.id ===selectedSlotId
      );

      const assignedOrder = orders.find(
        (order) => order.id === selectedSlot.orderId
      )
      return(
        <ContainerDetail
          slot = {selectedSlot}
          order = {assignedOrder}
          onBack={() => this.setState({ currentPage : "yard"})}
        />
      );
    }
        if(currentPage === "assignments"){
      return(
        <AssignmentList
          slots={slots}
          // slots : {slots} App의 공간 데이터를 목록 페이지에 전달 
          // onBack : 야드로 돌아가는 함수를 전달 
          onBack={()=> this.setState({currentPage :"yard"})}
        />
      );
    } 
    return(
      /* 표시할 화면을 작성 , HTML 처럼 보이는 이 문법: JSX*/
      <main>
        <h1>컨테이너 야드</h1>
        <button
          onClick={() => this.setState({currentPage:"assignments"})}
        >
         배정현황보기
        </button>
        <p>오더를 선택한 뒤 빈 공간을 클릭하세요</p>
        <h2>오더 목록</h2>

        <ul>
          {orders.map((order)=>( //map()은 배열의 항목을 하나씩 읽어서 화면 요소로 바꿈 
            <li key={order.id}>
              {order.id}/{order.product}/{order.quantity}개 
            </li>
          ))}
        </ul>
        
        <label htmlFor="order-select">배정할 오더 : </label>

        <select
          id="order-select"
          value={selectedOrderId} 
          /* value : 현재 선택값을 state 와 연결 */
          onChange={(event)=>
            this.setState({selectedOrderId:event.target.value})
            // this. setState() : 데이터를 변경하고 React가 화면을 다시 그리게 함 
            // event.target.value : 사용자가 선택한 오더 번호
          }
        >
          <option value="">오더를 선택하세요</option>

          {orders
            .filter((order)=>
              // some( ) : 일치하는 공간이 하나라도 있는지 확인 
            !slots.some((slot) => slot.orderId === order.id)
            )
            .map((order)=>(
              <option key={order.id} value={order.id}>
                {/* key : React 가 항목을 구별하는 값 , value : 사용자가 선택했을 때 가져올 값 */}
                {order.id}/{order.product}/{order.quantity}개 
              </option>
            ))}

        </select>

        <p>선택한 오더: {selectedOrderId || "없음" }</p>


        <h2>야드공간</h2>
        <div className="yard-grid">
          {slots.map((slot) => (
            <button
              key={slot.id}
              className={`yard-slot ${slot.orderId?"assigned":"empty"}`}
              onClick={() => this.handleSlotClick(slot)}
            >
              <strong>{slot.id}</strong>
              <p>{slot.orderId||"빈 공간"}</p> 
              {/* 오더 번호가 있으면 번호, null 이면 빈공간 */}
            </button>
          ))}
        </div>
      </main>
    );
  }
}
export default App;
/* 다른 파일에서 App을 가져다 사용할 수 있도록내보냄 . 기본 프로젝트의 index.js 가 이 컴포넌트를 불러와 화면에 표시 */

// jsx : javascript 코드 안에서 화며 구조를 HTML 처럼 작성할 수 있게 해주는 문법 