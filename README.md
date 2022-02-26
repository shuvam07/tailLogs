# tailLogs
Implement a socket connection between server and client to show real time logs to client as soon as log.txt is updated

Requirements

1. A server-side program to monitor the given log file and capable of streaming updates that happen in it. This will run on the same machine as the log file.

2. A web-based client (accessible via URL like http://localhost/log) that prints the updates in the file as and when they happen and NOT upon page refresh. The page should be loaded once and it should keep getting updated in real-time. The user sees the last 10 lines in the file when he lands on the page.

For file reading and monitoring
We are not allowed to use any third-party libraries for this bit.

Read the modified time of the file -> last_modified

Seek to the end of the file and save the position -> last_read_position

keep reading the file backwards till you find 10 new line characters, you now have the last 10 lines of the file, send it to the user over the WebSocket connection.

Keep polling the modified time of the file, if it changed

if it is changed seek to last_read_position and read till the end of the file and send the data to the user via WebSocket.

Save the new end of the file as last_read_position

save the new last_modified and go to 4



1. Create directory and inside that create empty npm project (npm init)
2. Implement socket.io as mentioned here https://socket.io/get-started/chat
2. run node index.js  and hit "localhost:3000"
