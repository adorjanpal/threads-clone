import React from "react";
import UserCard from "./UserCard";
import { Modal } from "reactstrap";
const LikersCard = ({ likers }: { likers: any[] }) => {
  return (
    <div>
      {likers.map((person: any) => {
        return (
          <UserCard
            key={person.id}
            id={person.id}
            name={person.name}
            username={person.username}
            imgUrl={person.image}
            personType="User"
          />
        );
      })}
    </div>
  );
};

export default LikersCard;
