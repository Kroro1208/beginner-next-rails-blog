class Api::V1::PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :content, :created_at, :updated_at, :image_url

  def image_url
    if object.image.attached?
      if Rails.env.development?
        # 開発環境用のURL生成
        "http://localhost:3001#{rails_blob_path(object.image, only_path: true)}"
      else
        # 本番環境用のURL生成
        rails_blob_url(object.image)
      end
    end
  end
end
