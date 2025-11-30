require "test_helper"

class AgentFlowTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(email: "test@example.com", team: Team.create!(name: "Test Team"))
    # Create Category
    category = Category.create!(name: "Productivity", slug: "productivity")
    # Create Agent
    @agent = Agent.create!(
      name: "Startup Co-Founder Brainstorm Agent",
      sku: "GEN-AGENT-001",
      price: 12_900,
      category: category,
      image_url: "http://example.com/image.jpg",
      description: "Test Description",
      icon_svg: "<svg></svg>"
    )
  end

  test "full agent purchase and run flow" do
    # 1. Login
    post "/api/login", params: { email: @user.email }, as: :json
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal @user.email, json_response["user"]["email"]

    # 2. Verify not purchased yet
    get "/api/me"
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_includes json_response["purchased_agent_ids"], @agent.id

    # 3. Purchase Agent
    post "/api/purchases", params: { agent_ids: [@agent.id] }, as: :json
    assert_response :success

    # 4. Verify purchased
    get "/api/me"
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_includes json_response["purchased_agent_ids"], @agent.id

    # 5. Run Agent
    post "/api/agents/cofounder_brainstorm/runs", params: {
      idea_summary: "Test Idea",
      target_user: "Test User",
      stage: "idea_validation",
      focus: "market"
    }, as: :json

    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal "succeeded", json_response["run"]["status"]
    assert_not_nil json_response["run"]["output_payload"]

    # 6. Verify History
    get "/api/agents/cofounder_brainstorm/runs"
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response["runs"].length
    assert_equal "Test Idea", json_response["runs"][0]["input_payload"]["idea_summary"]
  end
end
