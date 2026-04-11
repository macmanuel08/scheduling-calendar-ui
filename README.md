# Overview

The software is a scheduling system wich will show a form to the user that wants to make an appointment. The admin of the app, a doctor or staff may see a calendar to see users who have appointments. This is a fullstack project to further knowledge and skill building components, object oriented programming, and HTTP request and response. Because it is fullstack, I tried to create system design which is easy to change and update.

To start and see the project, you need a PostgresSQL set up and the .env file to connect with the database to run the server and see the appointment form and the calendar page. To start the server run 'pnpm dev' in the console.

# Web Pages

It has 2 web pages, the homepage and the calendar page. The homepage shows a form where a user to fill out to make an appointment. After submitting the form, the page will redirect to the calendar to confirm the appointment is already set. But it is not the standard which admin or staff should be the only see the appointments.

# Development Environment

## NEXT JS and React JS
I used Next JS which is built on top of react. I created APIs to connect fetch server for data and for CRUD operations to query or update the database. Because it is build on top of React it is easy to use React's ability to show UI and its features inlcuding managing states, passing props, and using components.

## Tailwind CSS
Tailwind allowes you to style UI by only adding classes to a component or HTML element without writing CSS code.

## Typescript
Typescript allows you to write typed JavaScript which will allow you to catch errors and bugs early when a value should be a specific data type, when a variable is not declared or instantiate, etc.

## Lucide React Icons
Display icons with as components and will shown in the DOM as SVGs.

## PostgresSQL
DBMS allowing you to perform CRUD operations to and from the database.

# Useful Websites

{Make a list of websites that you found helpful in this project}
* [Next JS](https://nextjs.org/docs)
* [React](https://react.dev/learn)
* [Typescript](https://www.typescriptlang.org/docs/)
* [Tailwind](https://tailwindcss.com/)

# Future Work
* Make it have dynamic so multiple businesses can use it
* Display more patients' info from the calendar page
* Add function for admins and staff to update the status of an appointment (pending, confirmed, completed, or canceled)