require "net/http"
require "json"
require "uri"

# Helper to print response
def print_res(res)
  puts "Response Code: #{res.code}"
  puts "Response Body: #{res.body}"
end

# 1. Setup session (hit home)
uri = URI("http://localhost:3000/")
http = Net::HTTP.new(uri.host, uri.port)
request = Net::HTTP::Get.new(uri)
response = http.request(request)
cookie = response['set-cookie']
puts "Got cookie: #{cookie}"

# 2. Add item to cart
# We need a valid agent_id. Let's assume 1 exists or try to find one.
# For this test, we'll try adding item with ID 1.
uri = URI("http://localhost:3000/api/cart_items")
request = Net::HTTP::Post.new(uri)
request['Cookie'] = cookie
request['Content-Type'] = 'application/json'
request.body = JSON.dump({ agent_id: 1, quantity: 1 })
response = http.request(request)
print_res(response)

# 3. Check cart has item
uri = URI("http://localhost:3000/api/cart")
request = Net::HTTP::Get.new(uri)
request['Cookie'] = cookie
response = http.request(request)
print_res(response)
cart_data = JSON.parse(response.body)
if cart_data['items'].empty?
  puts "WARNING: Cart is empty after adding item. Agent ID 1 might not exist."
else
  puts "Cart has #{cart_data['items'].length} items."
end

# 4. Clear cart
puts "Clearing cart..."
uri = URI("http://localhost:3000/api/cart")
request = Net::HTTP::Delete.new(uri)
request['Cookie'] = cookie
response = http.request(request)
print_res(response)

# 5. Check cart is empty
puts "Checking cart..."
uri = URI("http://localhost:3000/api/cart")
request = Net::HTTP::Get.new(uri)
request['Cookie'] = cookie
response = http.request(request)
print_res(response)
cart_data = JSON.parse(response.body)

if cart_data['items'].empty?
  puts "SUCCESS: Cart is empty."
else
  puts "FAILURE: Cart still has items."
end
