

// const account = await stripe.accounts.create({type: "express",});

// const accountLinks = await stripe.accountLinks.create({

// account: account.id,

// refresh_url: `${host}/api/stripe/account/reauth?account_id=${account.id}`, 
// return_url: `${host}/register${mobile? "-mobile" : ""}?account_id=${account.id}&result-success`,

// type: "account_onboarding",

// });

// if (mobile) { }

// // In case of request generated from the flutter app, return a json response res.status(200).json(success: true, url: accountLinks.url})
const data = {
    "title": "DealKaro - India's No.1 Escrow Platform for Safe and Secure Transactions",
    "description": "DealKaro is India's leading Escrow Platform, offering a secure and scam-free environment for making small product deals and property transactions. Download the DealKaro app now for instant payouts, 24/7 support, and a hidden product selling feature. No GST or KYC details required."
  };
  
  // Sanitize the description field to remove any potential bad control characters
  data.description = data.description.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  
  // Convert the data object to JSON string
  const jsonString = JSON.stringify(data);
  
  // Output the sanitized JSON string
  console.log(jsonString);
  