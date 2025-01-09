'use client';

const User = (props) => {
  console.log(props.date); //
  return (
    <div className="">
      <p>Name: {props.name}</p>
      <p>Age:{props.age}</p>
      <p>Time:{props.time}</p>
    </div>
  );
};

export default User;
