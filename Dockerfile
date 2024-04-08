FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install jq
RUN apt-get update && apt-get install -y jq

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
# If you're using yarn to manage dependencies, use `yarn install` instead of `npm install`
RUN yarn install

# Make your bash script executable
RUN chmod +x runAndExtract.sh

# Expose port 8545
EXPOSE 8545

# Run deploy_and_interact.sh when the container launches
CMD ["./runAndExtract.sh"]