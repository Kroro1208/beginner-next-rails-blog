class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :content, :created_at, :updated_at, :image_url

  def image_url
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
