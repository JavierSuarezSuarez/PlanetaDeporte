class Article < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :user
  has_one_attached :imagen
end
