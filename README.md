Full environment setup video can be found here:

- [Video 1: Setup Guide Part 1](https://drive.google.com/file/d/18RcuSnv151GjYvHk_SIfXu0UDeUuYMfE/view)
- [Video 2: Setup Guide Part 2](https://drive.google.com/file/d/1v9xj4f06XNqHZgP3zTr-ks7DL5UvqJO0/view)
```

# Multi-Vendor HD Partz - Built with Next.js, TypeScript, MySQL, Prisma, Clerk

This project is a **Multi-Vendor ECommerce Platform** built using **Next.js**, **TypeScript**, **MySQL**, **Prisma**, **Clerk**, and integrated with **Stripe**, **PayPal**, **Cloudinary**, and more.

## Software Requirements

Before running the project, ensure that the following software is installed on your system:


| Software      | Required      |
| ------------- | ------------  |
| **Node.js**   | Required      |
| **Next.js**   | Required      |
| **MySQL**     | Required      |
| **Prisma**    | Required      |
| **Stripe**    | Required      |
| **Clerk**     | Required      |
```



## Live Setup

To run the application live, follow these steps:

### 1. Clerk Setup

Set up Clerk for user authentication with the live domain. Add the following environment variables to your `.env` file:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 2. Database Setup

For local development, use the MySQL database with the following connection string:

```bash
mysql://root:<yourpassword>@localhost:3306/<db_name>
```

For the live database, we are using **Railway**. Set the following database URL in your environment variables:

```bash
DATABASE_URL="your_database_url"
```

### 3. Cloudinary Setup

Configure Cloudinary for image storage with the following keys:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME="your_preset_name"
```

### 4. IPInfo Setup

Add your **IPInfo** token:

```bash
IPINFO_TOKEN=your_ipinfo_token
```

### 5. PayPal Setup

Set the PayPal credentials:

```bash
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
```

### 6. Stripe Setup

Add your **Stripe** API keys:

```bash
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 7. Elasticsearch Setup

Add your **Elasticsearch** cloud credentials:

```bash
ELASTICSEARCH_CLOUD_ID=your_elasticsearch_cloud_id
ELASTICSEARCH_API_KEY=your_elasticsearch_api_key
```

### 8. Watchers Server

Set the **Watchers** server URL:

```bash
WATCHERS_SERVER=your_watchers_server_url
```

---

## Local Development

To run the application locally, follow these steps:

### 1. Clone the Repository

```bash
git clone <repository_url>
cd <project_folder>
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory and add the environment variables mentioned above.

### 3. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

### 4. Run the Development Server

Start the application locally by running:

```bash
npm run dev
```

The app should now be running on `http://localhost:3000`.

---

## Admin and Seller Login

To log in as an **Admin** or **Seller**, use the following credentials:

### Admin Login:
- **Email**: `hdpartz123@gmail.com`
- **Password**: `123hdpartz`

### Seller Login:
- **Email**: `hdpartz1234@gmail.com`
- **Password**: `1234hdpartz`

**Note**: To display products on the live site, you must first add products to the database, as the live database is currently empty.

---

## Database Sync (Railway)

To sync the database schema with **Railway**, follow these steps:

```bash
# Generate Prisma client
npx prisma generate

# Push the Prisma schema to the database
npx prisma db push
```

---

## Package Information

Below are the versions of the major packages used in the project:
| Software      | Version      |
| ------------- | ------------ |
| **Node.js**   | v18 or higher |
| **Next.js**   | v14.2.4      |
| **MySQL**     | v8.0         |
| **Prisma**    | Latest       |
| **Stripe**    | Latest       |
| **Clerk**     | Latest       |

Make sure your environment is using these versions or compatible ones to avoid any issues.

---

## Conclusion

By following these steps, you will successfully set up and run the **Multi-Vendor HD Partz** application both locally and in a live environment. Be sure to replace all placeholder values with your actual credentials and URLs.

