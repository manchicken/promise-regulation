# Load Balancer
This project contains a simple load balancer implementation along with two API services.

## Files

- `balancer.js`: The load balancer that distributes requests between `api1.js` and `api2.js`.
- `api1.js`: The Books Collection API service.
- `api2.js`: The Movies Collection API service.

## Usage

1. **Install dependencies**:
    ```sh
    npm install
    ```

2. **Start the services**:
    ```sh
    node api1.js
    node api2.js
    ```

3. **Start the load balancer**:
    ```sh
    node balancer.js
    ```

## Description

- **balancer.js**: This file contains the logic for distributing incoming requests between the two API services. It uses a round-robin algorithm to ensure even distribution.
- **api1.js**: This file represents the Books Collection API service. It listens on a specific port and responds to incoming requests related to books.
- **api2.js**: This file represents the Movies Collection API service. It listens on a different port and responds to incoming requests related to movies.

## License

This project is licensed under the MIT License.
## Load Balancer Algorithm

The load balancer in this project uses the Round Robin algorithm to distribute requests evenly between the two API services. The Round Robin algorithm works by cycling through the list of available services and assigning each incoming request to the next service in the list. This ensures that the load is distributed as evenly as possible across all services.

### How It Works

1. **Initialization**: The load balancer initializes a list of available services (`api1.js` and `api2.js`).
2. **Request Handling**: For each incoming request, the load balancer:
    - Selects the next service in the list.
    - Forwards the request to the selected service.
    - Moves to the next service in the list for the subsequent request.
3. **Cycle**: Once the end of the list is reached, the load balancer cycles back to the first service.

This method ensures that each service handles an equal number of requests over time, preventing any single service from becoming a bottleneck.

### Example

If there are three incoming requests, the load balancer will distribute them as follows:
- Request 1 -> `api1.js`
- Request 2 -> `api2.js`
- Request 3 -> `api1.js`

The fourth request will go to `api2.js`, and the cycle continues.

This simple yet effective algorithm helps in maintaining a balanced load across multiple services, improving the overall performance and reliability of the system.