
// // Store room data
// let rooms = {}; // Stores { roomID: { code, cursors } }

// const socketHandel = (io) => {

//     io.on("connection", (socket) => {
//         console.log(`User connected: ${socket.id}`);

//         // User joins a room
//         socket.on("joinRoom", (roomID) => {

//             socket.join(roomID);
//             console.log(`User ${socket.id} joined room: ${roomID}`);

//             if (!rooms[roomID]) {
//                 rooms[roomID] = { code: "", cursors: {} };
//             }
//             socket.emit("init", rooms[roomID]);

//             socket.to(roomID).emit("userJoined", socket.id);
//         });

//         // Code changes
//         socket.on("codeChange", ({ roomID, code }) => {
//             try {
//                 if (rooms[roomID]) {
//                     rooms[roomID].code = code;
//                     socket.to(roomID).emit("codeChange", code);
//                 }
//             } catch (error) {
//                 socket.emit("errorMessage", { message: error.message, error: 1 })
//             }

//         });

//         // Cursor movements
//         socket.on("cursorMove", ({ roomID, cursor }) => {
//             try {
//                 if (rooms[roomID]) {
//                     rooms[roomID].cursors[socket.id] = cursor;
//                     console.log(cursor)
//                     socket.to(roomID).emit("cursorMove", { id: socket.id, cursor });
//                 }
//             } catch (error) {
//                 socket.emit("errorMessage", { message: error.message, error: 1 })
//             }

//         });

//         // User disconnects
//         socket.on("disconnect", () => {
//             console.log(`User disconnected: ${socket.id}`);
//             for (let roomID in rooms) {
//                 if (rooms[roomID].cursors[socket.id]) {
//                     delete rooms[roomID].cursors[socket.id];
//                     io.to(roomID).emit("removeCursor", socket.id);
//                 }
//             }
//         });
//     });


// }

// export default socketHandel

// Store room data
let rooms = {}; // Stores { roomID: { code, cursors } }

const socketHandel = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins a room
    socket.on("joinRoom", (roomID) => {
      socket.join(roomID);
      console.log(`User ${socket.id} joined room: ${roomID}`);

      if (!rooms[roomID]) {
        rooms[roomID] = { code: "", cursors: {} };
      }
      socket.emit("init", rooms[roomID]);

      socket.to(roomID).emit("userJoined", socket.id);
    });

    // Code changes
    socket.on("codeChange", ({ roomID, code }) => {
      try {
        if (rooms[roomID]) {
          rooms[roomID].code = code;
          socket.to(roomID).emit("codeChange", code);
        }
      } catch (error) {
        socket.emit("errorMessage", { message: error.message, error: 1 });
      }
    });

    // Cursor movements
    socket.on("cursorMove", ({ roomID, cursor }) => {
        try {
          if (rooms[roomID]) {
            // Update the cursor position for the user
            rooms[roomID].cursors[socket.id] = cursor;
  console.log(rooms[roomID])
            // Broadcast the updated cursor position to all users in the room (except the sender)
            socket.to(roomID).emit("cursorMove", { id: socket.id, cursor });
          }
        } catch (error) {
          socket.emit("errorMessage", { message: error.message, error: 1 });
        }
      });
  

    // User disconnects
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      for (let roomID in rooms) {
        if (rooms[roomID].cursors[socket.id]) {
          delete rooms[roomID].cursors[socket.id];
          io.to(roomID).emit("removeCursor", socket.id);
        }
      }
    });
  });
};

export default socketHandel;