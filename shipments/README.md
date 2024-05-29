# Shipments CRUD Application

## Overview

This project is a Shipments CRUD (Create, Read, Update, Delete) application built using React. The application fetches shipment data from an API and displays it in a table format. Users can view, update, and delete shipment details through an interactive UI.

## Features

- **View Shipments**: Load and display a list of shipments in a table.
- **View Shipment Details**: Click on a shipment to view its details in a panel.
- **Update Shipment**: Modify shipment details through the details panel.
- **Delete Shipment**: Remove a shipment from the list.

## Technology Stack

- **Frontend**: React
- **Styling**: CSS (with a free template from Creative Tim)
- **API**: Mockaroo

## File Structure

## Components

### `ShipmentsTable.js`

- Displays the list of shipments in a table format.
- Provides buttons for viewing and deleting each shipment.

### `ShipmentDetails.js`

- Displays the details of a selected shipment.
- Allows updating shipment details.

## Styles

### `App.css`

- Contains the styles for the application, including table formatting and the details panel styling.

## API

The application fetches shipment data from the following API endpoint:
https://my.api.mockaroo.com/shipments.json?key=5e0b62d0

## Usage

- **Load Shipments**: On page load, the application fetches and displays the list of shipments.
- **View Details**: Click on the "View" button in the table to open the details panel for a specific shipment.
- **Update Shipment**: Modify the details in the form and click the "Update" button to save changes.
- **Delete Shipment**: Click the "Delete" button in the table to remove a shipment.

## Screenshots

- Shipments Table
- Shipment Details
