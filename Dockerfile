FROM ubuntu

# Update package index
RUN apt update -y

# Install Apache web server
#RUN apt install apache2 -y
RUN DEBIAN_FRONTEND=noninteractive apt install apache2 -y

# Specify the command to start Apache
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

# Copy contents from build directory to Apache's web root
COPY ./build/ /var/www/html/