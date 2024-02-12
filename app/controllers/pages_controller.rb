class PagesController < ApplicationController
  include HTTParty

  def init_data
    api_url = "#{ENV['CLOVERPOP_DOMAIN']}/api/v1/decisions"
    make_api_request(api_url, :get)
  end

  def create_decision
    api_url = "#{ENV['CLOVERPOP_DOMAIN']}/api/v1/decisions"
    body = { decision: params['decision'] }
    make_api_request(api_url, :post, body)
  end

  private

  def make_api_request(url, method, body = nil)
    response = HTTParty.send(method, url, body: body&.to_json, headers:)
    render json: { data: response }, status: :ok
  rescue HTTParty::Error => e
    Rails.logger.info "HTTParty::Error: #{e}"
    render json: { error: 'Failed to make API request' }, status: :internal_server_error
  end

  def headers
    api_key = ENV['CLOVERPOP_ORG_API_TOKEN']
    {
      'Content-Type' => 'application/json',
      'Authorization' => api_key.to_s
    }
  end
end
