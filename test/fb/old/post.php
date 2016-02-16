<?php
require_once __DIR__ . '/src/Facebook/autoload.php';
session_start();

$fb = new Facebook\Facebook([
  'app_id' => '1519278631720519',
  'app_secret' => '574b32baefb9528222655b330da67747',
  'default_graph_version' => 'v2.5',
 ]);


$helper = $fb->getRedirectLoginHelper();
$permissions = ['email', 'user_likes','publish_actions'];

try {
  $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

if (isset($accessToken)) {
  // Logged in!
  $_SESSION['facebook_access_token'] = (string) $accessToken;

  $fb->setDefaultAccessToken($_SESSION['facebook_access_token']);
  $linkData = [
  	'message' => 'Hello world',
  ];
  try {
	  $response = $fb->post('/me/feed',  $linkData);
	} catch(Facebook\Exceptions\FacebookResponseException $e) {
	  // When Graph returns an error
	  echo 'Graph returned an error: ' . $e->getMessage();
	  exit;
	} catch(Facebook\Exceptions\FacebookSDKException $e) {
	  // When validation fails or other local issues
	  echo 'Facebook SDK returned an error: ' . $e->getMessage();
	  exit;
	}

	$graphNode = $response->getGraphNode();
	echo 'Posted with id: ' . $graphNode['id'];
}else{
	$loginUrl = $helper->getLoginUrl('http://www.michelemargiotta.it/lab/fb/', $permissions);
	echo '<a href="' . $loginUrl . '">Log in with Facebook!</a>';
}

?>