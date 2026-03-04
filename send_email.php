<?php
/**
 * This file handles the backend logic for your cPanel hosting.
 * Upload this to your 'public_html' folder.
 */

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Collect and clean the data from the form
    $name    = strip_tags(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // 2. Set your email address (where you want to receive the mail)
    $recipient = "info@nlcoachingsolutions.com"; // <--- CHANGE THIS TO YOUR ACTUAL EMAIL

    // 3. Create the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // 4. Create the email headers
    $email_headers = "From: $name <$email>";

    // 5. Send the email
    if (mail($recipient, "New Website Inquiry: $subject", $email_content, $email_headers)) {
        // Redirect to a thank you page (or back to home with a success message)
        echo "<script>alert('Thank you! Your message has been sent.'); window.location.href='contact.html';</script>";
    } else {
        echo "<script>alert('Oops! Something went wrong and we couldn\'t send your message.'); window.history.back();</script>";
    }

} else {
    // If someone tries to access this file directly, redirect them back to the contact page
    header("Location: contact.html");
    exit;
}
?>