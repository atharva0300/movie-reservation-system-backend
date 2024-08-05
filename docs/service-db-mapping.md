# Service to DB Tables Mapping

| **Service**       | **SQL Tables**                     | **NoSQL Collections**                     |
|-------------------|------------------------------------|-------------------------------------------|
| Auth              | User                               |                                           |
| Booking           | Ticket, Seat, Slot                 |                                           |
| Movie Service     | Movie                              | cast, director, genre, movie_info, trailer_gallery |
| Notification      | Offer, Ticket ( Read )                              |                                           |
| Search            | Place, Theater, Screen, Movie      |                                           |
| Showtime          | Slot, Screen, Theater              |                                           |
| User              | User                               | comment, review                           |




# Example Interaction Flow
Booking a Ticket:

The Booking Service interacts with the Auth Service to verify user identity.
It queries the Showtime Service for available slots.
It reserves a seat in the Seat table.
It creates a ticket entry in the Ticket table.
It sends a notification using the Notification Service.
Adding a Movie:

The Movie Service updates the Movie table.
It adds related information to cast, director, genre, movie_info, and trailer_gallery collections in NoSQL.
User Writing a Review:

The User Service ensures the user is authenticated via the Auth Service.
It adds the review to the review collection in NoSQL.