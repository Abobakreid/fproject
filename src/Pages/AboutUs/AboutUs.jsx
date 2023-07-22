import React from "react";
import { Footer, Navbar } from "../../Components";

const AboutUs = () => {
  return (
    <div className="about">
      <Navbar home={"home"} stadiums={"stadium"} login={"register"} />
      <div className="about_container container">
        <div>
          <div className="lead">
            The challenge of managing and allocating available football pitches
            to different teams or individuals who want to use them for training
            or games. This can be a complex task, particularly in areas where
            there is a high demand for limited resources. The problem may
            include issues such as scheduling conflicts, insufficient field
            capabilities, and difficulties coordinating bookings between
            multiple parties. Effective solutions may require the use of
            advanced scheduling software, improved communication channels, and
            better management practices to ensure fair and efficient
            distribution of resources.
          </div>
          <div className="lead">
            <h2>Problems facing the player or the team</h2> - If the team loses
            an individual or members of the players, or if one of the players
            wants to play a match and does not have a team.
            <p className="lead">
              - The problem of completing the team or finding a team for one
              player, taking into account its evaluation in the application.
            </p>
          </div>
          <div className="lead">
            <h2>Problems facing stadium owners Stadium managers</h2>
            Problems facing stadium owners Stadium managers are faced with the
            problem of managing the booking of five-a-side football pitches. The
            system may not be manual. Most stadiums lack an effective
            computerized management system that promotes easy management. It is
            to find a suitable place to announce its stadium, details and
            location.
            <p className="lead">
              - The problem of calculating the hours available or reserved for
              the stadium and displaying the hours available only to players or
              those wishing to reserve the stadium to play on.
            </p>
            <p className="lead">
              - The problem of showing the correct information about the stadium
              to the players.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
