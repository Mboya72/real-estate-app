"""Add Contact model

Revision ID: efc4feffefc4
Revises: 4786f7d6e53a
Create Date: 2025-01-31 03:50:24.969417

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'efc4feffefc4'
down_revision = '4786f7d6e53a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('review')
    op.drop_table('property')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('property',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(length=255), nullable=False),
    sa.Column('price', sa.FLOAT(), nullable=False),
    sa.Column('location', sa.VARCHAR(length=255), nullable=False),
    sa.Column('bedrooms', sa.INTEGER(), nullable=False),
    sa.Column('description', sa.VARCHAR(length=500), nullable=True),
    sa.Column('image', sa.VARCHAR(length=255), nullable=True),
    sa.Column('property_type', sa.VARCHAR(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('review',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('rating', sa.INTEGER(), nullable=False),
    sa.Column('comment', sa.VARCHAR(length=500), nullable=True),
    sa.Column('created_at', sa.DATETIME(), nullable=True),
    sa.Column('property_id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['property_id'], ['property.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
