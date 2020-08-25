class Recipe < ApplicationRecord
    include PgSearch::Model
    
    validates :name, presence: true
    validates :instruction, presence: true
    has_many :comments, dependent: :destroy
    
    multisearchable against: [:name, :ingredients],
                    using: {
                        tsearch: {
                            prefix: true
                        }
                    }
end
