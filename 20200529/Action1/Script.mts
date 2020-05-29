'=================================================================================================================================================================================
'	This script is using the suggested URL from the May 28, 2020 8:00 AM - 9:00 AM ET meeting
'		This is just showing AI working against the application, and occasional traditional OR steps when necessary
'		The business processes are:
'			1 = Login with known/existing user ID
'			2 = Create new user ID
'			3 = Add a product from New Arrivals to cart and then remove from cart, data driving by the name of the product
'=================================================================================================================================================================================



Browser("Browser").ClearCache													'Clear the browser cache, the application sometimes gets pushed changes that require a clear cache
Browser("Browser").Navigate "https://ambsn.com/"								'Navigate to the application @@ hightlight id_;_66560_;_script infofile_;_ZIP::ssf1.xml_;_
Browser("Browser").Maximize														'Maximize the browser or the objects won't be visible
AIUtil.SetContext Browser("Browser")											'Instruct the AI SDK to start working against the browser
AIUtil("mail").Exist(10)														'Synchronization, seems that the "Got a Question" is always the last object to open
'=================================================================================================================================================================================
'	This Code block is for business process 1
'=================================================================================================================================================================================
If DataTable.GlobalSheet.GetParameter("BusinessProcess") = 1 Then
	AIUtil("profile").Click															'Click on the profile link
	AIUtil("text_box", "Email", micFromTop, 1).Type DataTable.GlobalSheet.GetParameter("Email")	'Enter the Email address on the datasheet
	AIUtil("text_box", "Password", micFromTop, 1).Type DataTable.GlobalSheet.GetParameter("Password")	'Enter the password on the datasheet
	AIUtil("button", "Sign In").Click												'Click the Sign In button.
End If


'=================================================================================================================================================================================
'	This Code block is for business process 2
'=================================================================================================================================================================================
If DataTable.GlobalSheet.GetParameter("BusinessProcess") = 2 Then
	AIUtil("profile").Click															'Click on the profile link
	AIUtil("text_box", "First Name").Type DataTable.GlobalSheet.GetParameter("FirstName")	'Enter the first name from the datasheet
	AIUtil("text_box", "Last Name").Type DataTable.GlobalSheet.GetParameter("LastName")		'Enter the last name from the data sheet
	AIUtil("text_box", "Email", micFromBottom, 1).Type DataTable.GlobalSheet.GetParameter("Email")	'Enter the Email from the datasheet
	AIUtil("text_box", "Password", micFromBottom, 1).Type DataTable.GlobalSheet.GetParameter("Password")	'Enter the password from the datasheet
	AIUtil("button", "Create").Click												'CLick the Create button
End If

'=================================================================================================================================================================================
'	This Code block is for business process 3
'=================================================================================================================================================================================
If DataTable.GlobalSheet.GetParameter("BusinessProcess") = 3 Then
	AIUtil.FindTextBlock("New Arrivals").Click										'Click on the New Arrivals text
	'Because the products aren't visible on the page when you first click on the New Arrivals, use a traditional OR which will include forcing a scroll to the place on the page where the item is located.
	Browser("Browser").Page("New Arrivals – ambsn").WebElement("ProducttoPick").Click	'Using traditional OR, click on the product name from the datasheet
	AIUtil("combobox", "Size").Select DataTable.GlobalSheet.GetParameter("Size")	'Select the Size from the datasheet
	AIUtil.FindTextBlock("Add to Cart").Click										'Add the product to the cart
	AIUtil("button", "CheckOut-y").Click											'Click the CheckOut button
	'Because the Return to cart text isn't visible on the page when you first click CheckOut, use a traditional OR which will include forcing a scroll to the place on the page where the item is located.
	Browser("Browser").Page("Information - ambsn -").WebElement("Return to cart").Click	'Click the Return to cart link
	Browser("Browser").Page("Your Shopping Cart – ambsn").WebElement("WebElement").Click	'Click the Trash can icon, it's too small for the AI vision to see it
End If

AIUtil("mail").Exist(10)														'Synchronization, seems that the "Got a Question" is always the last object to open
AIUtil.FindTextBlock("california").Click										'Click the "california" text that is part of the logo at the top of the screen to get to the home page
AIUtil("mail").Exist(10)														'Synchronization, seems that the "Got a Question" is always the last object to open
Browser("Browser").Close

