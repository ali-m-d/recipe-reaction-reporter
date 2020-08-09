class Recipe < ApplicationRecord
    validates :name, presence: true
    validates :instruction, presence: true
    has_many :comments
end
